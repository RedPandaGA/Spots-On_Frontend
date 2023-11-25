import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Config from '../.config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const papiUrl = Config.PAPI_URL;
import Modal from "react-native-modal";

const CreateColonyModal = ({ isModalVisible, hideModal, showModal, user }) => {
  const [isPrivateColony, setIsPrivateColony] = useState(true);
  const [isPublicColony, setIsPublicColony] = useState(false);

  const [colonyName, setColonyName] = useState("");

  // const screenHeight = Dimensions.get("window").height;
  // const percentageThreshold = 0.6; // Adjust the percentage as needed

  const createColony = async () => {
    try {
        // Get the authorization token from AsyncStorage
        const authToken = await AsyncStorage.getItem('token');
        if (!authToken) {
          // Handle the case where the token is not available
          console.error('Authorization token not found.');
          return;
        }
    
        const response = await fetch(`${papiUrl}/createColony`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
          },
          body: JSON.stringify({
            cname: colonyName,
          }),
        });
    
        if (!response.ok) {
          // Handle error, e.g., display an error message
          console.error('Error creating colony:', response.status);
          return;
        }
    
        // Successfully created colony
        console.log('Colony created successfully:', response);
      } catch (error) {
        console.error('Error:', error);
        // Handle other errors as needed
      }
  }

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: (e, gestureState) => {
//       // Calculate the threshold based on a percentage of the screen height
//       const threshold = screenHeight * percentageThreshold;
//       return e.nativeEvent.pageY < threshold;
//     },
//     onPanResponderMove: (event, gestureState) => {
//       if (gestureState.dy > 0) {
//         if (gestureState.dy < screenHeight * percentageThreshold) {
//           modalPosition.setValue(gestureState.dy);
//         }
//       }
//     },
//     onPanResponderRelease: (event, gestureState) => {
//       if (gestureState.dy > 200) {
//         hideModal();
//       } else {
//         modalPosition.setValue(0);
//       }
//     },
//   });
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: (e, gestureState) => {
  //     // Calculate the threshold based on a percentage of the screen height
  //     const threshold = screenHeight * percentageThreshold;
  //     return e.nativeEvent.pageY < threshold;
  //   },
  //   onPanResponderMove: (event, gestureState) => {
  //     if (gestureState.dy > 0) {
  //       if (gestureState.dy < screenHeight * percentageThreshold) {
  //         modalPosition.setValue(gestureState.dy);
  //       }
  //     }
  //   },
  //   onPanResponderRelease: (event, gestureState) => {
  //     if (gestureState.dy > 200) {
  //       hideModal();
  //     } else {
  //       modalPosition.setValue(0);
  //     }
  //   },
  // });

  // const modalPosition = new Animated.Value(0);

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection="down"
      style={styles.modalContainer}
      backdropOpacity={0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust this as needed
        >
          <View style={[styles.modalContent, styles.shadow]}>
            <Bar color={COLORS.primary} />
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                  setTimeout(() => {
                    showModal("social");
                  }, 500);
                  // showModal("social");
                  console.log("Pressed back button to social");

                  // CREATE COLONY AND UPLOAD COLONY INFORMATION TO DATABASE
                  // ENTER USER IN SAID NEW COLONY WITH ADMIN PERMISSIONS?
                }}
              >
                <Image
                  source={require("../assets/backButton.png")}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Create Colony</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={
                  isPrivateColony ? styles.buttonPressed : styles.buttonNormal
                }
                onPress={() => {
                  setIsPrivateColony(true);
                  setIsPublicColony(false);
                  console.log("Pressed Private");
                }}
              >
                <Text style={styles.buttonText}>Private</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isPublicColony
                    ? user.premium
                      ? styles.buttonPressed
                      : [styles.buttonPressed, styles.disabledButton]
                    : user.premium
                    ? styles.buttonNormal
                    : [styles.buttonNormal, styles.disabledButton]
                }
                onPress={() => {
                  // Your onPress logic here
                  setIsPrivateColony(false);
                  setIsPublicColony(true);
                  console.log("Pressed Public");
                }}
                disabled={!user.premium} // Disable TouchableOpacity if user.premium is false
              >
                <Text style={styles.buttonText}>Public</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder="Colony Name"
                placeholderTextColor={COLORS.primary}
                value={colonyName}
                onChangeText={(text) => setColonyName(text)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.buttonNormal,
                { alignSelf: "center", marginTop: 10 },
              ]}
              onPress={() => {
                console.log("Created Colony: " + colonyName);
                createColony();
                hideModal();
              }}
            >
              <Text style={styles.buttonText}>Create Colony</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  buttonNormal: {
    borderRadius: 30,
    width: 160,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPressed: {
    borderRadius: 30,
    width: 160,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: COLORS.darkersecondary,
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
    height: 46,
    width: 46,
    position: "absolute",
    left: -60,
    tintColor: COLORS.primary,
  },
  input: {
    height: 60,
    borderColor: COLORS.darkersecondary,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default CreateColonyModal;
