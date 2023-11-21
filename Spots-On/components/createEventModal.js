import React, { useState } from "react";
import {
  Modal,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Bar from "./bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./colors";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "expo-checkbox";

const CreateEventModal = ({
  isModalVisible,
  hideModal,
  showModal,
  colonies,
  allSpots,
}) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("Date");
  const [timeText, setTimeText] = useState("Time");

  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const [filteredSpots, setFilteredSpots] = useState([]);

  const [event, setEvent] = useState({
    colonyName: "",
    date: new Date(),
    time: "",
    customAddress: "",
    coordinate: {},
    description: "",
    spotName: "",
  });

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(event.address);
    console.log("Geocoded Address: \n", geocodedLocation);
    Keyboard.dismiss();
    return geocodedLocation;
  };

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShow(Platform.OS === "ios");
    setEvent({ ...event, ["date"]: selectedDate });
    // setShow(false);
    let tempDate = new Date(currentDate);
    let hours = tempDate.getHours();
    let minutes =
      tempDate.getMinutes() > 9
        ? tempDate.getMinutes()
        : "0" + tempDate.getMinutes();
    if (hours == 0 || hours == 12) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    let fTime = hours + ":" + minutes;
    if (tempDate.getHours() >= 12) {
      fTime += " pm";
    } else {
      fTime += " am";
    }

    setDateText(fDate);
    setTimeText(fTime);
    setEvent({ ...event, ["time"]: fTime });

    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeColony = (item) => {
    const selectedColonyName = item.name;
    handleInputChange("colonyName", selectedColonyName);

    // Filter spots based on the selected colony name
    const spotsInColony = allSpots.filter(
      (spot) => spot.colonyName === selectedColonyName
    );
    setFilteredSpots(spotsInColony);
  };

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.3; // Adjust the percentage as needed

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      // Calculate the threshold based on a percentage of the screen height
      // const threshold = screenHeight * percentageThreshold;
      // return e.nativeEvent.pageY > threshold && e.nativeEvent.pageY < screenHeight * (percentageThreshold + .1);
      return true;
    },
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        if (gestureState.dy < screenHeight * percentageThreshold) {
          modalPosition.setValue(gestureState.dy);
        }
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > 200) {
        hideModal();
      } else {
        modalPosition.setValue(0);
      }
    },
  });

  const modalPosition = new Animated.Value(0);

  const handleInputChange = (key, value) => {
    setEvent({ ...event, [key]: value });
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust this as needed
      >
        <View style={styles.modalContainer} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalPosition }] },
            ]}
          >
            <Bar color={COLORS.primary} />
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                  showModal("social");
                  console.log("Pressed back button to social");

                  // CREATE EVENT AND UDPDATE DATABASE WITH ALL THE INFO RECEIVED FROM THIS MODAL
                  // DATE, TIME, ASSOCIATED COLONY NAME, LOCATION, DESCRIPTION, ETC.
                }}
              >
                <Image
                  source={require("../assets/backButton.png")}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Create Event</Text>
            </View>
            <ScrollView style={{ width: "100%" }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={() => {
                    showMode("date");
                    console.log("Pressed Date");
                  }}
                >
                  <Text style={styles.buttonText}>{dateText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={() => {
                    showMode("time");
                    console.log("Pressed Time");
                  }}
                >
                  <Text style={styles.buttonText}>{timeText}</Text>
                </TouchableOpacity>
              </View>
              {show && (
                <View>
                  <DateTimePicker
                    testId="dateTimePicker"
                    value={event.date}
                    mode={mode}
                    is24Hour={false}
                    display="spinner"
                    textColor={COLORS.primary}
                    onChange={onChange}
                  />
                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => setShow(false)}
                    >
                      <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.inputContainer}>
                {/* <TextInput
                  style={styles.input}
                  placeholder="Colony Name"
                  placeholderTextColor={COLORS.primary}
                  value={event.colonyName}
                  onChangeText={(text) => handleInputChange("colonyName", text)}
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
                    event.colonyName === "" ? "Colony Name *" : event.colonyName
                  }
                  value={event.colonyName}
                  onChange={onChangeColony}
                />
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={isCustomAddress}
                    onValueChange={setIsCustomAddress}
                    style={styles.checkbox}
                    color={COLORS.primary}
                  />
                  <Text style={styles.checkboxLabel}>Use custom address?</Text>
                </View>
                {isCustomAddress ? (
                  <TextInput
                    style={styles.input}
                    placeholder="Custom Address * "
                    placeholderTextColor={COLORS.primary}
                    value={event.address}
                    onChangeText={(text) => handleInputChange("address", text)}
                  />
                ) : (
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.placeholderStyle}
                    itemTextStyle={styles.itemTextStyle}
                    iconStyle={styles.iconStyle}
                    data={filteredSpots}
                    search={false}
                    maxHeight={300}
                    labelField="name"
                    valueField="coordinate"
                    placeholder={
                      event.spotName === "" ? "Spot *" : event.spotName
                    }
                    value={event.spotName}
                    disable={filteredSpots.length < 1}
                    onChange={(item) => {
                      // const statusValue = item.value - 1;
                      // setUser({ ...user, statusCode: statusValue });
                      // console.log(statusIdentifiers[statusValue].label);
                      handleInputChange("spotName", item.name);
                      handleInputChange("coordinate", item.coordinate);
                    }}
                  />
                )}
                {!isCustomAddress &&
                  filteredSpots.length < 1 &&
                  event.colonyName !== "" && (
                    <Text style={styles.errorMessage}>
                      <Text>No spots found in colony </Text>
                      <Text style={{ textDecorationLine: "underline" }}>
                        {event.colonyName}
                      </Text>
                      <Text>
                        . Please create a spot or use a custom address.
                      </Text>
                    </Text>
                  )}

                <TextInput
                  style={[
                    styles.input,
                    { height: 150, textAlignVertical: "top" },
                  ]}
                  placeholder="Description"
                  placeholderTextColor={COLORS.primary}
                  multiline
                  numberOfLines={4}
                  value={event.description}
                  onChangeText={(text) =>
                    handleInputChange("description", text)
                  }
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={() => {
                    hideModal();
                    setSocialModal(true);
                    console.log("Event Canceled");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={() => {
                    // Save the event object or perform other actions here
                    const geocodedLocation = geocode();
                    setEvent({ ...event, ["coordinate"]: geocodedLocation });
                    hideModal();
                    console.log("Event Created", event);
                  }}
                >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    height: 500,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonNormal: {
    borderRadius: 30,
    width: 160,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 10,
    alignItems: "center",
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
  header: {
    flexDirection: "row",
    display: "flex",
    alignContent: "space-around",
  },
  backButton: {
    height: 50,
    width: 50,
    position: "absolute",
    left: -60,
    tintColor: COLORS.primary,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: COLORS.darkersecondary,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButton: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 200,
  },
  confirmButtonText: {
    textAlign: "center",
    color: COLORS.secondary,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  itemTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    tintColor: COLORS.primary,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingLeft: 12,
  },
  checkbox: {
    alignSelf: "center",
    height: 25,
    width: 25,
  },
  checkboxLabel: {
    margin: 8,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  errorMessage: {
    color: COLORS.active,
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default CreateEventModal;
