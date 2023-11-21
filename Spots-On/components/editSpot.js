import React, { useState, useEffect } from "react";
import {
  // Modal,
  Switch,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import COLORS from "./colors";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Bar from "./bar";
import MapView, { Marker, Circle } from "react-native-maps";
import Slider from "@react-native-community/slider";
import Spot from "./spot";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";

const EditSpot = ({
  isModalVisible,
  hideModal,
  // cancelCreateSpot,
  // newSpot,
  // setNewSpot,
  // resetNewSpot,
  allSpots,
  setAllSpots,
  mapRegion,
  colonies,
  currentSpot,
}) => {
  // const [showAddSpot, setShowAddSpot] = useState(false);
  const [showSpotList, setShowSpotList] = useState(true);
  const [circleRadius, setCircleRadius] = useState(50);
  const [circleCenter, setCircleCenter] = useState(currentSpot.coordinate);
  const [region, setRegion] = useState(mapRegion);
  const [newSpot, setNewSpot] = useState({
    name: "",
    colonyName: "",
    radius: 250,
    coordinate: {},
    address: "",
    safe: true,
  });

  const resetNewSpot = () => {
    setNewSpot({
      name: "",
      colonyName: "",
      radius: 250,
      coordinate: {},
      address: "",
      safe: true,
    });
  };

  // const colonyList = colonies.map((colony, index) => [
  //   {
  //     label: colony.name,
  //     value: index + 1,
  //   },
  // ]);
  // console.log(colonyList);

  const [spotNameError, setSpotNameError] = useState(null);
  const [colonyNameError, setColonyNameError] = useState(null);

  // // Animated values
  // const spotListOpacity = new Animated.Value(1);
  // const addSpotOpacity = new Animated.Value(0);
  // const addSpotTranslateX = new Animated.Value(300);
  // const spotListTranslateX = new Animated.Value(-300);

  const handleInputChange = (key, value) => {
    setNewSpot({ ...newSpot, [key]: value });
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
    // setShowAddSpot(false);
    setShowSpotList(true);
    setSpotNameError(false);
    setColonyNameError(false);
    resetNewSpot();
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

  // useEffect(() => {
  //   // Animate the content switch
  //   if (showAddSpot) {
  //     // Spot list slides out to the left
  //     Animated.timing(spotListTranslateX, {
  //       toValue: -300,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();

  //     // Add spot form fades in and slides in from the right
  //     Animated.parallel([
  //       Animated.timing(addSpotOpacity, {
  //         toValue: 1,
  //         duration: 500,
  //         useNativeDriver: false,
  //       }),
  //       Animated.spring(addSpotTranslateX, {
  //         toValue: 0,
  //         useNativeDriver: false,
  //       }),
  //     ]).start();
  //   } else {
  //     // Spot list slides in from the left
  //     Animated.timing(spotListTranslateX, {
  //       toValue: 0,
  //       duration: 200,
  //       useNativeDriver: false,
  //     }).start();

  //     // Add spot form fades out and slides out to the right
  //     Animated.parallel([
  //       Animated.timing(addSpotOpacity, {
  //         toValue: 0,
  //         duration: 500,
  //         useNativeDriver: false,
  //       }),
  //       Animated.spring(addSpotTranslateX, {
  //         toValue: 300,
  //         useNativeDriver: false,
  //       }),
  //     ]).start();
  //   }
  // }, [showAddSpot]);

  // const renderSpotItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity style={styles.addSpotButton}>
  //       <Image
  //         style={styles.spotListImage}
  //         source={require("../assets/marker.png")}
  //       />
  //       <Text style={styles.addSpotText}>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderSpotItem = ({ item }) => {
    // Find the associated colony
    const associatedColony = colonies.find(
      (colony) => colony.name === item.colonyName
    );

    // Display the spot only if the associated colony is selected
    if (associatedColony && associatedColony.selected) {
      return (
        <TouchableOpacity
          onPress={() => console.log(item.coordinate)}
          style={styles.addSpotButton}
        >
          <Image
            style={styles.spotListImage}
            source={require("../assets/marker.png")}
          />
          <Text style={styles.addSpotText}>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    // If the associated colony is not selected, return null to render nothing
    return null;
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
        // setShowAddSpot(false);
        setShowSpotList(true);
        hideModal();
        // cancelCreateSpot();
        // resetNewSpot();
      }}
      onSwipeComplete={() => {
        // setShowAddSpot(false);
        setShowSpotList(true);
        hideModal();
        // cancelCreateSpot();
        // resetNewSpot();
      }}
      swipeThreshold={200}
      swipeDirection={showSpotList ? "down" : null}
      propagateSwipe
      style={styles.modalContainer}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Bar style={styles.bar} color={COLORS.secondary} />
          {/* {showSpotList ? (
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.modalTitle}>{currentSpot.spotName}</Text>
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
            </View> */}
          {/* ) : ( */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={styles.addSpotHeader}>
                {/* <TouchableOpacity
                  onPress={() => {
                    hideModal();
                    resetValues();
                  }}
                >
                  <Image
                    source={require("../assets/back-button-secondary-color.png")}
                    style={styles.backButton}
                  />
                </TouchableOpacity> */}
                <Text style={styles.addSpotTitle}>{currentSpot.spotName}</Text>
              </View>
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: COLORS.secondary,
                  fontSize: 16,
                }}
              >
                {currentSpot.colonyName}
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, spotNameError && styles.inputError]}
                    placeholder="Edit Spot Name"
                    placeholderTextColor={COLORS.secondary}
                    value={newSpot.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                  />
                  {spotNameError && (
                    <Text style={styles.errorMessage}>{spotNameError}</Text>
                  )}
                  {/* <TextInput
                      style={[
                        styles.input,
                        colonyNameError && styles.inputError,
                      ]}
                      placeholder="Colony Name *"
                      placeholderTextColor={COLORS.secondary}
                      value={newSpot.colonyName}
                      onChangeText={(text) =>
                        handleInputChange("colonyName", text)
                      }
                    /> */}
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
                        ? "Edit Associated Colony"
                        : newSpot.colonyName
                    }
                    value={newSpot.colonyName}
                    onChange={(item) => {
                      // const statusValue = item.value - 1;
                      // setUser({ ...user, statusCode: statusValue });
                      // console.log(statusIdentifiers[statusValue].label);
                      handleInputChange("colonyName", item.name);
                    }}
                  />
                  {colonyNameError && (
                    <Text style={styles.errorMessage}>{colonyNameError}</Text>
                  )}
                  <View style={styles.findLocationContainer}>
                    <TextInput
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
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Safe Spot?</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#E7EFCA" }}
                    thumbColor={newSpot.safe ? "#2C6765" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSafety}
                    value={newSpot.safe}
                  />
                </View>
                <MapView
                  style={styles.map}
                  region={currentSpot.coordinate}
                  userInterfaceStyle="light"
                  // onPress={handleMapPress}
                  onRegionChange={(newRegion) => {
                    setCircleCenter(newRegion);
                  }}
                  onRegionChangeComplete={(newRegion) => {
                    setCircleCenter(newRegion);
                  }}
                >
                  {/* <View
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                      }}
                    >
                      <Marker coordinate={circleCenter}>
                        <Image
                          source={require("../assets/marker.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      </Marker>
                      <Circle
                        center={circleCenter}
                        radius={circleRadius}
                        strokeWidth={1}
                        strokeColor={newSpot.safe ? "#2C6765" : "#FF5555"}
                        fillColor={
                          newSpot.safe
                            ? "rgba(44, 103, 101, .3)"
                            : "rgba(255, 85, 85, .3)"
                        } // transparent versions of COLORS.primary/COLORS.active
                      />
                    </View> */}
                  <Spot
                    coordinate={circleCenter}
                    spotName={currentSpot.spotName}
                    colonyName={currentSpot.colonyName}
                    isSafe={currentSpot.safe}
                    spotRadius={circleRadius}
                    isEditSpotVisible={isModalVisible}
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
                        setAllSpots([...allSpots, updatedSpot]);
                        // setShowAddSpot(false);
                        setShowSpotList(true);
                        // hideModal();
                        console.log(
                          "Spot Edited:\n",
                          currentSpot,
                          "to",
                          newSpot
                        );
                        hideModal();
                        resetValues();
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* )} */}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    justifyContent: "flex-end",
    // // alignItems: "center",
    margin: 0,
    // backgroundColor: COLORS.primary,
    // height: "50%",
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    // padding: 20,
    height: "95%",
    width: "100%",
    // alignItems: "center",
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
    borderWidth: 1.5,
    borderColor: "#ccc",
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
    alignSelf: "center",
  },
  backButton: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    marginTop: 5,
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
    // borderRadius: 10,
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  switchContainer: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
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
  // inputError: {
  //   borderColor: "red",
  // },
  errorMessage: {
    color: COLORS.active,
    fontSize: 14,
    // marginTop: 5,
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

export default EditSpot;