import React, { useState, useEffect } from "react";
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
  allSpots,
  setAllSpots,
  mapRegion,
  colonies,
  currentSpot,
}) => {
  const [showSpotList, setShowSpotList] = useState(true);
  const [circleRadius, setCircleRadius] = useState(currentSpot.radius);
  const [circleCenter, setCircleCenter] = useState(currentSpot.coordinate);
  const [region, setRegion] = useState(mapRegion);
  const [newSpot, setNewSpot] = useState(currentSpot);

  const [spotNameError, setSpotNameError] = useState(null);
  const [colonyNameError, setColonyNameError] = useState(null);

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
    setShowSpotList(true);
    setSpotNameError(false);
    setColonyNameError(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!newSpot.spotName.trim()) {
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

  const updateSpot = () => {
    // Find the index of the current spot in the allSpots array

    console.log(
      allSpots.map((item) => {
        console.log(item.name);
        console.log(item.colonyName);
        console.log(item.coordinate);
      })
    );
    console.log("CURRENT SPOT:");
    console.log(currentSpot.spotName);
    console.log(currentSpot.colonyName);
    console.log(currentSpot.coordinate);
    const spotIndex = allSpots.findIndex(
      (spot) => spot.name === currentSpot.spotName
    );
    console.log(spotIndex);

    if (spotIndex !== -1) {
      // Create a copy of allSpots
      const updatedSpots = [...allSpots];

      // Update the spot at the identified index with the new values
      updatedSpots[spotIndex] = {
        ...currentSpot,
        name: newSpot.spotName,
        colonyName: newSpot.colonyName,
        address: newSpot.address,
        safe: newSpot.safe,
        radius: circleRadius,
        coordinate: circleCenter,
      };

      // Set the state with the updated array
      setAllSpots(updatedSpots);

      // Hide the modal and reset values
      hideModal();
      resetValues();

      console.log("Spot Edited:\n", currentSpot, "to", updatedSpots[spotIndex]);
    }
    // }
  };

  const deleteSpot = () => {
    // Find the index of the current spot in the allSpots array
    console.log(
      allSpots.map((item) => {
        console.log(item.name);
        console.log(item.colonyName);
        console.log(item.coordinate);
      })
    );
    console.log("CURRENT SPOT:");
    console.log(currentSpot.spotName);
    console.log(currentSpot.colonyName);
    console.log(currentSpot.coordinate);
    const spotIndex = allSpots.findIndex(
      (spot) => spot.name === currentSpot.spotName
    );

    if (spotIndex !== -1) {
      // Create a copy of allSpots
      const updatedSpots = [...allSpots];

      // Remove the spot at the identified index
      updatedSpots.splice(spotIndex, 1);

      // Set the state with the updated array
      setAllSpots(updatedSpots);

      // Hide the modal and reset values
      hideModal();
      resetValues();

      console.log("Spot Deleted:\n", currentSpot);
    }
  };

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
      backdropOpacity={0}
      style={styles.modalContainer}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Bar style={styles.bar} color={COLORS.secondary} />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={styles.infoContainer}>
                <View style={styles.addSpotHeader}>
                  <TextInput
                    style={[
                      styles.addSpotTitle,
                      spotNameError && styles.inputError,
                    ]}
                    placeholder="Edit Spot Name"
                    placeholderTextColor={COLORS.secondary}
                    value={newSpot.spotName}
                    onChangeText={(text) => handleInputChange("spotName", text)}
                  />
                  <Image
                    source={require("../assets/pencil.png")}
                    style={{
                      tintColor: COLORS.secondary,
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
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
                  onRegionChange={(newRegion) => {
                    setCircleCenter(newRegion);
                  }}
                  onRegionChangeComplete={(newRegion) => {
                    setCircleCenter(newRegion);
                  }}
                >
                  <Spot
                    coordinate={circleCenter}
                    spotName={newSpot.spotName}
                    colonyName={newSpot.colonyName}
                    isSafe={newSpot.safe}
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
                  <TouchableOpacity
                    style={styles.buttonNormal}
                    onPress={() => {
                      hideModal();
                      deleteSpot();
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonNormal}
                    onPress={() => updateSpot()}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
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

    marginVertical: 20,
    marginHorizontal: 10,
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
    height: "40%",
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

export default EditSpot;
