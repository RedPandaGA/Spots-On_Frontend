import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Config from '../.config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const papiUrl = Config.PAPI_URL;

const SocialModal = ({ isModalVisible, hideModal, showModal }) => {
  const [joinColonyCode, setJoinColonyCode] = useState("");

  const [isJoinColonyInputFocused, setIsJoinColonyInputFocused] =
    useState(false);

  const joinColony = async () => {
    try {
        // Get the authorization token from AsyncStorage
        const authToken = await AsyncStorage.getItem('token');
        if (!authToken) {
        // Handle the case where the token is not available
        console.error('Authorization token not found.');
        return;
        }

        const response = await fetch(`${papiUrl}/joinColony`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({
            invite: joinColonyCode,
        }),
        });

        if (!response.ok) {
        // Handle error, e.g., display an error message
        console.error('Error joining colony:', response.status);
        return;
        }

        // Successfully joined colony
        console.log('Successfully joined colony:', response);
    } catch (error) {
        console.error('Error:', error);
        // Handle other errors as needed
    }
  }

  const handleJoinColonyFocus = () => {
    setIsJoinColonyInputFocused(true);
  };

  const handleJoinColonyBlur = () => {
    setIsJoinColonyInputFocused(false);
  };

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.5; // Adjust the percentage as needed

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

  const statusInputRef = useRef(null);

  const joinColonyInputRef = useRef(null);

  const handleUnfocus = () => {
    if (statusInputRef.current) {
      statusInputRef.current.blur();
    }
    if (joinColonyInputRef.current) {
      joinColonyInputRef.current.blur();
    }
  };

  const modalPosition = new Animated.Value(0);

  const buttonList = [
    // "Create a Spot",
    "Join Colony",
    "Create Colony",
    "View Events",
    "Create Event",
  ];

  // Create an array of functions to handle button actions
  const buttonActions = [
    // () => {
    //   console.log("Create a Spot clicked");
    // },
    () => {
      console.log("Join Colony clicked");
      // Handle specific action for Button 4
    },
    () => {
      hideModal();
      showModal("createColony");
      console.log("Create Colony clicked");
      // Handle specific action for Button 5
    },
    () => {
      hideModal();
      showModal("viewEvents");
      console.log("View Events clicked");
      // Handle specific action for Button 2
      // You can customize this function for each button
    },
    () => {
      hideModal();
      showModal("createEvent");
      console.log("Create Event clicked");
      // Handle specific action for Button 3
    },
  ];

  const renderButton = (text, index) => {
    if (text === "Join Colony") {
      return (
        <View key={text}>
          <TextInput
            ref={joinColonyInputRef}
            style={[
              styles.modalButton,
              styles.inputNormal,
              isJoinColonyInputFocused ? styles.inputFocused : null,
            ]}
            placeholder={isJoinColonyInputFocused ? "" : text}
            placeholderTextColor={COLORS.primary}
            value={joinColonyCode}
            onChangeText={(text) => setJoinColonyCode(text)}
            onFocus={handleJoinColonyFocus}
            onBlur={handleJoinColonyBlur}
          />
          {isJoinColonyInputFocused && (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                handleUnfocus();
                setJoinColonyCode("");
                joinColony();
                // handleStatusBlur();
                // console.log("Joined colony with code: " + joinColonyCode);
              }}
            >
              <Image
                source={require("../assets/backButton.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.modalButton}
          onPress={buttonActions[index]}
          key={text}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      );
    }
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
            {buttonList.map((buttonText, index) =>
              renderButton(buttonText, index)
            )}
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
    height: 400,
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  modalButton: {
    padding: 10,
    width: 350,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputNormal: {
    padding: 10,
    width: 350,
    height: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 20,
  },
  inputFocused: {
    backgroundColor: COLORS.darkersecondary,
  },
  imageContainer: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    position: "absolute",
    right: 10, // Adjust the position as needed
    top: 15, // Adjust the position as needed
    transform: [{ rotate: "180deg" }],
  },
  image: {
    width: 40,
    height: 40,
    tintColor: COLORS.primary,
  },
});

export default SocialModal;
