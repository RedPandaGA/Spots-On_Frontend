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

const CreateEventModal = ({ isModalVisible, hideModal, showModal }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("Date");
  const [timeText, setTimeText] = useState("Time");

  const [event, setEvent] = useState({
    colonyName: "",
    eventDate: new Date(),
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
  });

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    //setShow(Platform.OS === 'ios');
    setEvent({ ...event, ["eventDate"]: selectedDate });
    setShow(false);
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
    setEvent({ ...event, ["eventTime"]: fTime });

    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
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
                  source={require("../assets/back-button-primary-color.png")}
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
                    value={event.eventDate}
                    mode={mode}
                    is24Hour={false}
                    display="spinner"
                    textColor={COLORS.primary}
                    onChange={onChange}
                  />
                  {/* <TouchableOpacity>
                                            <Text>Confirm</Text>
                                        </TouchableOpacity> */}
                </View>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Colony Name"
                  placeholderTextColor={COLORS.primary}
                  value={event.colonyName}
                  onChangeText={(text) => handleInputChange("colonyName", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  placeholderTextColor={COLORS.primary}
                  value={event.eventLocation}
                  onChangeText={(text) =>
                    handleInputChange("eventLocation", text)
                  }
                />
                <TextInput
                  style={[
                    styles.input,
                    { height: 150, textAlignVertical: "top" },
                  ]}
                  placeholder="Description"
                  placeholderTextColor={COLORS.primary}
                  multiline
                  numberOfLines={4}
                  value={event.eventDescription}
                  onChangeText={(text) =>
                    handleInputChange("eventDescription", text)
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
    height: 400,
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
    borderWidth: 1.5,
    borderColor: COLORS.gray,
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
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: COLORS.gray,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateEventModal;
