import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Bar from "./bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./colors";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "expo-checkbox";
import Modal from "react-native-modal";
import GooglePlacesInput from "./googlePlacesInput";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment-timezone";
import * as Localization from "expo-localization";
import Config from "../.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const papiUrl = Config.PAPI_URL;

const CreateEventModal = ({
  isModalVisible,
  hideModal,
  showModal,
  colonies,
  allSpots,
  setAllSpots,
  eventsToday,
  eventsUpcoming,
  setEventsToday,
  setEventsUpcoming,
  getUsersSpotsInColony,
  setSpots,
  user,
}) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("Date");
  const [timeText, setTimeText] = useState("Time");

  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const [filteredSpots, setFilteredSpots] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    colonyName: "",
    dateTime: "",
    address: "",
    spotName: "",
    description: "",
  });

  const resetErrors = () => {
    setErrors({
      name: "",
      colonyName: "",
      dateTime: "",
      address: "",
      spotName: "",
      description: "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      colonyName: "",
      dateTime: "",
      address: "",
      spotName: "",
      description: "",
    };

    if (!event.name) {
      newErrors.name = "Please enter an Event Name.";
    }

    if (!event.colonyName) {
      newErrors.colonyName = "Please select a Colony Name.";
    }

    if (!event.time) {
      newErrors.dateTime = "Please select a Date and Time.";
    }

    if (!event.description) {
      newErrors.description = "Please enter a Description.";
    }

    if (!event.address && isCustomAddress) {
      newErrors.address = "Please enter an Address.";
    }

    if (!event.spotName && !isCustomAddress) {
      newErrors.spotName = "Please select a Spot Name.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const [event, setEvent] = useState({
    name: "",
    colonyName: "",
    date: new Date(),
    time: "",
    address: "",
    coordinate: {},
    description: "",
    spotName: "",
    sid: "",
    cid: "",
  });

  const createSpotRetsid = async () => {
    try {
      // Get the authorization token from AsyncStorage
      const authToken = await AsyncStorage.getItem("token");

      if (!authToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not found.");
        return;
      }

      const spotData = {
        sname: event.name,
        location: event.coordinate,
        danger: 0,
        cid: event.cid,
        radius: 250,
      };
      console.log(spotData);
      const response = await fetch(`${papiUrl}/createSpot`, {
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
      responsedata = await response.json();
      // Successfully created spot
      console.log("Spot created successfully: " + JSON.stringify(responsedata.dbres[0]));
      setSpots(await getUsersSpotsInColony(event.cid));
      return responsedata.dbres[0].sid;
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors as needed
    }
  };

  const createEvent = async () => {
    try {
      // Get the authorization token from AsyncStorage
      const authToken = await AsyncStorage.getItem("token");
      if (!authToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not found.");
        return;
      }

      // Input date string in the given format
      const inputDateString = event.date + " " + event.time;
      console.log(inputDateString);

      // Parse the input string using moment and set the local timezone
      const localDateTime = moment(event.date);
      const postgresTimestamp = localDateTime
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      console.log("Local Time:", localDateTime.format("MM/DD/YYYY h:mm a"));
      console.log("UTC Time for PostgreSQL:", postgresTimestamp);
      console.log(event);
      let createEvent = {};

      if (event.isCustomAddress) {
        console.log("spot");
        console.log(event);
        createEvent = JSON.stringify({
          ename: event.name,
          etime: postgresTimestamp,
          description: event.description,
          creator: user.uid,
          cid: event.cid,
          location_sid: event.sid,
          address: event.spotName,
        });
      } else {
        console.log(event.sid);
        console.log("customadd");
        event.sid = await createSpotRetsid();
        console.log(event.sid);
        createEvent = JSON.stringify({
          ename: event.name,
          etime: postgresTimestamp,
          description: event.description,
          creator: user.uid,
          cid: event.cid,
          location_sid: event.sid,
          address: event.address,
        });
      }

      console.log("Create Event: " + createEvent);
      const response = await fetch(`${papiUrl}/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
        },
        body: createEvent,
      });

      if (!response.ok) {
        // Handle error, e.g., display an error message
        console.error("Error creating Event:", response.status);
        return;
      }

      // Successfully created colony
      console.log("Event created successfully:", response);
      Keyboard.dismiss();
      resetEventState();
      resetErrors();
      hideModal();
      setTimeout(() => {
        showModal("viewEvents");
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors as needed
    }
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(event.address);
    console.log("Geocoded Address: \n", geocodedLocation);
    Keyboard.dismiss();
    return geocodedLocation;
  };

  const resetEventState = () => {
    const reset = {
      name: "",
      colonyName: "",
      date: new Date(),
      time: "",
      address: "",
      coordinate: {},
      description: "",
      spotName: "",
    };
    setEvent(reset);
    setDateText("Date");
    setTimeText("Time");
    resetErrors();
  };

  const handleCreateEvent = () => {
    const isValid = validateForm();
    // console.log(errors);
    // console.log(event);
    if (isValid) {
      // Save the event object or perform other actions here
      if (event.address !== "") {
        const geocodedLocation = geocode();
        setEvent({ ...event, ["coordinate"]: geocodedLocation });
      }

      const today = new Date();
      const todaysDate = `${
        today.getMonth() + 1
      }${today.getDate()}${today.getFullYear()}`;

      // console.log("Today's Date:", todaysDate);

      const eventDate = `${
        event.date.getMonth() + 1
      }${event.date.getDate()}${event.date.getFullYear()}`;

      // console.log("Event Date:", eventDate);

      let newEvents;
      if (todaysDate == eventDate) {
        newEvents = eventsToday.concat(event);
        setEventsToday(newEvents);
      } else {
        newEvents = eventsUpcoming.concat(event);
        setEventsUpcoming(newEvents);
      }

      // console.log(event);
      // console.log(newEvents);

      resetEventState();
      hideModal();
      setTimeout(() => {
        showModal("viewEvents");
      }, 500);
      console.log("Event Created", event);
    }
  };

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShow(Platform.OS === "ios");
    setEvent((event) => ({ ...event, ["date"]: new Date(selectedDate) }));
    // handleInputChange("date", new Date(currentDate));
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
    setEvent((event) => ({ ...event, ["time"]: fTime }));

    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeColony = (item) => {
    const selectedColonyName = item.name;
    handleInputChange("colonyName", selectedColonyName);
    handleInputChange("cid", item.cid);
    const getUser = async () => {
      setSpots(await getUsersSpotsInColony(item.cid));
    };
    getUser();
    // Filter spots based on the selected colony name
    // const spotsInColony = allSpots.filter(
    //   (spot) => spot.colonyName === selectedColonyName
    // );
    setFilteredSpots(allSpots);
    console.log("These are the arrays of spots in the colony\n", allSpots);
    const spotsInColony = allSpots.filter(
      (spot) => spot.colonyName === selectedColonyName
    );
    setErrors({ ...errors, ["colonyName"]: "" });
  };

  const handleInputChange = (key, value) => {
    setEvent((prevEvent) => {
      const updatedEvent = { ...prevEvent, [key]: value };
      console.log("Updated Event:", updatedEvent);
      return updatedEvent;
    });
    if (key === "address") {
      setErrors({ ...errors, ["address"]: "" });
    }
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection="down"
      backdropOpacity={0.4}
      propagateSwipe
      style={styles.modalContainer}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust this as needed
      >
        <View style={[styles.modalContent, styles.shadow]}>
          <Bar style={styles.bar} color={COLORS.primary} />
          <TouchableWithoutFeedback
            touchSoundDisabled
            onPress={() => Keyboard.dismiss()}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    hideModal();
                    resetEventState();
                    setTimeout(() => {
                      showModal("social");
                    }, 500);
                    // showModal("social");
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

              <ScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    placeholderTextColor={COLORS.primary}
                    value={event.name}
                    onChangeText={(text) => {
                      handleInputChange("name", text);
                      setErrors({ ...errors, ["name"]: "" });
                    }}
                  />
                  {errors.name ? (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  ) : null}
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
                      event.colonyName === "" ? "Colony Name" : event.colonyName
                    }
                    value={event.colonyName}
                    onChange={onChangeColony}
                  />
                  {errors.colonyName ? (
                    <Text style={styles.errorMessage}>{errors.colonyName}</Text>
                  ) : null}
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={isCustomAddress}
                      onValueChange={setIsCustomAddress}
                      style={styles.checkbox}
                      color={COLORS.primary}
                    />
                    <Text style={styles.checkboxLabel}>
                      Use custom address?
                    </Text>
                  </View>
                  {isCustomAddress ? (
                    <View style={styles.findLocationContainer}>
                      <GooglePlacesInput
                        placeholderText="Custom Address"
                        placeholderTextColor={COLORS.primary}
                        changeMapRegion={true}
                        textInputStyle={[
                          styles.input,
                          {
                            backgroundColor: "transparent",
                            paddingHorizontal: 10,
                            borderRadius: 10,
                          },
                        ]}
                        handleInputChange={handleInputChange}
                      />
                    </View>
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
                        // event.spotName === "" ? "Spot *" : event.spotName
                        "Choose Spot"
                      }
                      value={event.spotName}
                      disable={filteredSpots.length < 1}
                      onChange={(item) => {
                        // setErrors({ ...errors, ["spotName"]: "" });
                        console.log("Selected spot:", item.name);
                        handleInputChange("spotName", item.name);
                        handleInputChange("sid", item.id);
                        handleInputChange("coordinate", item.coordinate);
                        setErrors({ ...errors, ["spotName"]: "" });
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
                  {!isCustomAddress && errors.spotName ? (
                    <Text style={styles.errorMessage}>{errors.spotName}</Text>
                  ) : null}
                  {isCustomAddress && errors.address ? (
                    <Text style={styles.errorMessage}>{errors.address}</Text>
                  ) : null}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.buttonDateTime}
                      onPress={() => {
                        showMode("date");
                        console.log("Pressed Date");
                      }}
                    >
                      <Text style={styles.buttonDateTimeText}>{dateText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonDateTime}
                      onPress={() => {
                        showMode("time");
                        console.log("Pressed Time");
                      }}
                    >
                      <Text style={styles.buttonDateTimeText}>{timeText}</Text>
                    </TouchableOpacity>
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
                            onPress={() => {
                              setShow(false);
                              setErrors({ ...errors, ["dateTime"]: "" });
                            }}
                          >
                            <Text style={styles.confirmButtonText}>
                              Confirm
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                  {errors.dateTime ? (
                    <Text style={styles.errorMessage}>{errors.dateTime}</Text>
                  ) : null}

                  <TextInput
                    style={[
                      styles.input,
                      { height: 100, textAlignVertical: "top" },
                    ]}
                    placeholder="Description"
                    placeholderTextColor={COLORS.primary}
                    multiline
                    numberOfLines={4}
                    value={event.description}
                    onChangeText={(text) => {
                      handleInputChange("description", text);
                      setErrors({ ...errors, ["description"]: "" });
                    }}
                  />
                  {errors.description ? (
                    <Text style={styles.errorMessage}>
                      {errors.description}
                    </Text>
                  ) : null}
                </View>
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={() => {
                    hideModal();
                    resetEventState();
                    setTimeout(() => {
                      showModal("social");
                    }, 500);
                    // showModal("social");
                    console.log("Event Canceled");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonNormal}
                  onPress={createEvent}
                >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
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
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    // alignItems: "center",
    height: "95%",
    width: "100%",
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
    width: "45%",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  buttonDateTime: {
    borderRadius: 10,
    width: "45%",
    borderWidth: 2,
    marginVertical: 10,
    borderColor: COLORS.darkersecondary,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  buttonDateTimeText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 5,
  },
  backButton: {
    height: 50,
    width: 50,
    // position: "absolute",
    // left: -60,
    marginRight: 15,
    marginTop: 2,
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
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  bar: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  findLocationContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
});

export default CreateEventModal;
