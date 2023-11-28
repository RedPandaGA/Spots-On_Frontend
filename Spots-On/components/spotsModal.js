import React, { useState, useEffect, useRef } from "react";
import {
  Switch,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import COLORS from "./colors";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Bar from "./bar";
import MapView from "react-native-maps";
import Slider from "@react-native-community/slider";
import Spot from "./spot";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import Config from "../.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = Config.PAPI_URL;
import GooglePlacesInput from "./googlePlacesInput";

const CreateSpotModal = ({
  isModalVisible,
  hideModal,
  allSpots,
  setAllSpots,
  mapRegion,
  colonies,
  showModal,
  currentSpot,
  setCurrentSpot,
}) => {
  const [showSpotList, setShowSpotList] = useState(true);
  const [circleRadius, setCircleRadius] = useState(50);
  const [circleCenter, setCircleCenter] = useState({
    latitude: mapRegion.latitude,
    longitude: mapRegion.longitude,
  });
  const [region, setRegion] = useState(mapRegion);
  const [newSpot, setNewSpot] = useState({
    name: "",
    colonyName: "",
    colonyId: "",
    radius: 250,
    coordinate: {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
    },
    address: "",
    safe: true,
  });

  useEffect(() => {
    setNewSpot((prevNewSpot) => ({
      ...prevNewSpot,
      coordinate: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
      },
    }));
  }, []);

  const createSpot = async () => {
    try {
      // Get the authorization token from AsyncStorage
      const authToken = await AsyncStorage.getItem("token");

      if (!authToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not found.");
        return;
      }

      const spotData = {
        sname: newSpot.name,
        location: newSpot.coordinate,
        danger: newSpot.safe,
        cid: newSpot.colonyId,
        radius: newSpot.radius,
      };
      console.log(spotData);
      const response = await fetch(`${apiUrl}/createSpot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify(spotData),
      });

      if (!response.ok) {
        // Handle error, e.g., display an error message
        console.error("Error creating spot:", response.status);
        return;
      }

      // Successfully created spot
      console.log("Spot created successfully: " + response);
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors as needed
    }
  };

  // const resetNewSpot = () => {
  //   setNewSpot({
  //     name: "",
  //     colonyName: "",
  //     colonyId: "",
  //     radius: 250,
  //     coordinate: {},
  //     address: "",
  //     safe: true,
  //   });
  // };

  const [spotNameError, setSpotNameError] = useState(null);
  const [colonyNameError, setColonyNameError] = useState(null);

  const handleInputChange = (key, value) => {
    setNewSpot((newSpot) => ({ ...newSpot, [key]: value }));
    // Clear the error when the user starts typing
    key === "name" && setSpotNameError(null);
    key === "colonyName" && setColonyNameError(null);
  };

  const resetValues = () => {
    setCircleCenter({
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
    });
    setCircleRadius(50);
    setShowSpotList(true);
    setSpotNameError(false);
    setColonyNameError(false);
    // resetNewSpot();
  };

  const validateInputs = () => {
    let isValid = true;

    if (!newSpot.name.trim()) {
      setSpotNameError("Spot Name is required");
      isValid = false;
    }

    if (!newSpot.colonyName.trim()) {
      setColonyNameError("Colony Name is required");
      isValid = false;
    }

    return isValid;
  };

  const toggleSafety = () => {
    setNewSpot((prevSpot) => ({
      ...prevSpot,
      safe: !prevSpot.safe,
    }));
  };

  // Use a ref to store the previous currentSpot value
  // const prevCurrentSpotRef = useRef();

  // useEffect(() => {
  //   // Update the local state when currentSpot prop changes
  //   if (currentSpot && currentSpot !== prevCurrentSpotRef.current) {
  //     setNewSpot({
  //       name: currentSpot.name,
  //       colonyName: currentSpot.colonyName,
  //       radius: currentSpot.radius,
  //       coordinate: currentSpot.coordinate,
  //       address: currentSpot.address,
  //       safe: currentSpot.safe,
  //     });

  //     // Save the currentSpot to the ref for the next comparison
  //     prevCurrentSpotRef.current = currentSpot;
  //   }
  // }, [currentSpot]);

  const renderSpotItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          hideModal();
          setCurrentSpot(item);

          console.log("Current Spot:", currentSpot);
          console.log("Item:", item);
          setTimeout(() => {
            showModal("editSpot");
          }, 1000);
          // showModal("editSpot");
          // console.log(item.coordinate);
        }}
        style={styles.addSpotButton}
      >
        <Image
          style={styles.spotListImage}
          source={require("../assets/marker.png")}
        />
        <Text style={styles.addSpotText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(newSpot.address);
    console.log("Geocoded Address: \n", geocodedLocation);
    setRegion({
      latitude: geocodedLocation[0].latitude,
      longitude: geocodedLocation[0].longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   // geocode();
  //   console.log(newSpot.coordinate);
  //   setRegion({
  //     latitude: newSpot.coordinate.latitude,
  //     longitude: newSpot.coordinate.longitude,
  //     latitudeDelta: 0.005,
  //     longitudeDelta: 0.005,
  //   });
  //   Keyboard.dismiss();
  // }, [newSpot.address]);

  const metersToFeet = (meters) => {
    // 1 meter is approximately 3.28084 feet
    const feetConversionFactor = 3.28084;

    // Convert meters to feet
    const feet = meters * feetConversionFactor;

    return feet.toFixed(0);
  };

  let feetValue = metersToFeet(circleRadius);

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setShowSpotList(true);
        hideModal();
      }}
      onSwipeComplete={() => {
        setShowSpotList(true);
        hideModal();
      }}
      swipeThreshold={200}
      swipeDirection={showSpotList ? "down" : null}
      propagateSwipe
      style={styles.modalContainer}
      backdropOpacity={0.4}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Bar style={styles.bar} color={COLORS.secondary} />
          {showSpotList ? (
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Spots</Text>
              </View>
              <View style={styles.spotContainer}>
                <TouchableOpacity
                  style={styles.addSpotButton}
                  onPress={() => {
                    // setShowAddSpot(true);
                    setShowSpotList(false);
                    console.log(mapRegion);
                  }}
                >
                  <AntDesign
                    style={styles.addSpotImage}
                    name="pluscircle"
                    size={40}
                    color={COLORS.secondary}
                  />
                  <Text style={styles.addSpotText}>Add a new Spot</Text>
                </TouchableOpacity>
                <FlatList
                  data={allSpots}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderSpotItem}
                  style={styles.spotList}
                />
              </View>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.addSpotHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      resetValues();
                    }}
                  >
                    <Image
                      source={require("../assets/backButton.png")}
                      style={styles.backButton}
                    />
                  </TouchableOpacity>
                  <Text style={styles.addSpotTitle}>Add a Spot</Text>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[styles.input, spotNameError && styles.inputError]}
                      placeholder="Spot Name *"
                      placeholderTextColor={COLORS.secondary}
                      value={newSpot.name}
                      onChangeText={(text) => handleInputChange("name", text)}
                    />
                    {spotNameError && (
                      <Text style={styles.errorMessage}>{spotNameError}</Text>
                    )}
                    <Dropdown
                      style={styles.input}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.placeholderStyle}
                      itemTextStyle={styles.itemTextStyle}
                      iconStyle={styles.iconStyle}
                      data={colonies}
                      search={false}
                      maxHeight={300}
                      labelField="name"
                      valueField="value"
                      placeholder={
                        newSpot.colonyName === ""
                          ? "Colony Name *"
                          : newSpot.colonyName
                      }
                      value={newSpot.colonyName}
                      onChange={(item) => {
                        // const statusValue = item.value - 1;
                        // setUser({ ...user, statusCode: statusValue });
                        // console.log(statusIdentifiers[statusValue].label);
                        newSpot.colonyName = item.name;
                        setColonyNameError(null);
                        newSpot.colonyId = item.cid;
                        handleInputChange("colonyName", item.name);
                      }}
                    />
                    {colonyNameError && (
                      <Text style={styles.errorMessage}>{colonyNameError}</Text>
                    )}
                    <View style={styles.findLocationContainer}>
                      {/* <TextInput
                        style={[styles.input, { width: "80%" }]}
                        placeholder="Find Address"
                        placeholderTextColor={COLORS.secondary}
                        value={newSpot.address}
                        onChangeText={(text) =>
                          handleInputChange("address", text)
                        }
                      />
                      <TouchableOpacity
                        onPress={geocode}
                        style={styles.findLocationButton}
                      >
                        <Text style={styles.findLocationText}>Find</Text>
                      </TouchableOpacity> */}
                      <GooglePlacesInput
                        placeholderText="Find address on map"
                        placeholderTextColor={COLORS.secondary}
                        changeMapRegion={true}
                        textInputStyle={[
                          styles.input,
                          {
                            backgroundColor: "transparent",
                            paddingHorizontal: 0,
                            borderRadius: 0,
                          },
                        ]}
                        handleInputChange={handleInputChange}
                      />
                    </View>
                  </View>
                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Safe Spot?</Text>
                    <Switch
                      trackColor={{ false: "#767577", true: COLORS.secondary }}
                      thumbColor={newSpot.safe ? COLORS.gold : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSafety}
                      value={newSpot.safe}
                    />
                  </View>
                  <MapView
                    style={styles.map}
                    region={
                      newSpot.coordinate &&
                      newSpot.coordinate.latitude != undefined &&
                      newSpot.coordinate.longitude != undefined
                        ? {
                            latitude: newSpot.coordinate.latitude,
                            longitude: newSpot.coordinate.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                          }
                        : mapRegion
                    }
                    userInterfaceStyle="light"
                    onRegionChange={(newRegion) => {
                      setCircleCenter(newRegion);
                    }}
                    onRegionChangeComplete={(newRegion) => {
                      setCircleCenter(newRegion);
                    }}
                  >
                    <Spot
                      coordinate={circleCenter}
                      spotName={newSpot.name}
                      colonyName={newSpot.colonyName}
                      isSafe={newSpot.safe}
                      spotRadius={circleRadius}
                    />
                  </MapView>

                  <View style={styles.sliderContainer}>
                    <Slider
                      minimumValue={46}
                      maximumValue={3810}
                      step={1}
                      value={circleRadius}
                      onValueChange={(value) => setCircleRadius(value)}
                      minimumTrackTintColor={COLORS.secondary}
                      thumbTintColor={COLORS.gold}
                      style={{ width: "70%" }}
                    />
                    <Text style={styles.sliderText}>{feetValue} feet</Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity
                    style={styles.buttonNormal}
                    onPress={() => {
                      hideModal();
                      cancelCreateSpot();
                      resetNewSpot();
                    }}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.buttonNormal}
                      onPress={() => {
                        // Validate inputs before proceeding
                        if (validateInputs()) {
                          // Save the event object or perform other actions here
                          const updatedSpot = {
                            ...newSpot,
                            id: Date.now(),
                            radius: circleRadius,
                            coordinate: circleCenter,
                          };
                          newSpot.coordinate = circleCenter;
                          newSpot.radius = circleRadius;
                          //setAllSpots([...allSpots, updatedSpot]);
                          // setShowAddSpot(false);
                          setShowSpotList(true);
                          // hideModal();
                          createSpot();
                          console.log("Spot Created:\n", newSpot);
                          resetValues();
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "95%",
    width: "100%",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.secondary,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  spotContainer: {
    flex: 1,
  },
  addSpotButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  addSpotImage: {
    marginRight: 15,
  },
  addSpotText: {
    color: COLORS.secondary,
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  spotList: {
    flex: 1,
    height: 300,
    width: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  buttonNormal: {
    borderRadius: 30,
    width: "45%",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },

  buttonText: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  addSpotHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    marginTop: 5,
    tintColor: COLORS.secondary,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 60,
    borderColor: COLORS.secondary,
    borderBottomWidth: 1,
    paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 0,
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  switchContainer: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  switchText: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 20,
    alignSelf: "center",
  },
  addSpotTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.secondary,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  spotListImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: COLORS.red,
  },
  bar: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
    marginBottom: 0,
  },
  map: {
    height: "30%",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    marginVertical: 10,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderText: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  findLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  findLocationButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    justifyContent: "flex-end",
    marginTop: 10,
    marginLeft: 10,
  },
  findLocationText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  errorMessage: {
    color: COLORS.active,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  itemTextStyle: {
    fontSize: 20,
  },
  iconStyle: {
    tintColor: COLORS.secondary,
  },
});

export default CreateSpotModal;
