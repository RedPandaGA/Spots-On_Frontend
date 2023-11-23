import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const SocialModal = ({ isModalVisible, hideModal, showModal }) => {
  const [joinColonyCode, setJoinColonyCode] = useState("");

  const [isJoinColonyInputFocused, setIsJoinColonyInputFocused] =
    useState(false);

  const handleJoinColonyFocus = () => {
    setIsJoinColonyInputFocused(true);
  };

  const handleJoinColonyBlur = () => {
    setIsJoinColonyInputFocused(false);
  };

  const joinColonyInputRef = useRef(null);

  const handleUnfocus = () => {
    if (joinColonyInputRef.current) {
      joinColonyInputRef.current.blur();
    }
  };

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

      // CHECK IF CODE IS ASSOCIATED WITH COLONY IN DATABASE
      // IF SO, UPDATE DATABASE TO ENTER USER IN COLONY
      // ELSE, THROW ERROR AND SAY INVALID CODE OR SOMETHING
    },
    () => {
      handleUnfocus();
      Keyboard.dismiss();
      hideModal();
      setTimeout(() => {
        showModal("createColony");
      }, 500);
      console.log("Create Colony clicked");
      // Handle specific action for Button 5
    },
    () => {
      handleUnfocus();
      Keyboard.dismiss();
      hideModal();
      setTimeout(() => {
        showModal("viewEvents");
      }, 500);
      console.log("View Events clicked");
      // Handle specific action for Button 2
      // You can customize this function for each button
    },
    () => {
      handleUnfocus();
      Keyboard.dismiss();
      hideModal();
      setTimeout(() => {
        showModal("createEvent");
      }, 500);
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
                console.log("Joined colony with code: " + joinColonyCode);
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
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={() => {
        Keyboard.dismiss();
        hideModal();
      }}
      onModalHide={handleUnfocus}
      onSwipeComplete={hideModal}
      swipeDirection="down"
      style={styles.modalContainer}
      backdropOpacity={0}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust this as needed
      >
        <View style={[styles.modalContent, styles.shadow]}>
          <Bar color={COLORS.primary} />
          {buttonList.map((buttonText, index) =>
            renderButton(buttonText, index)
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
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-end",
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
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 50,
  },
});

export default SocialModal;
