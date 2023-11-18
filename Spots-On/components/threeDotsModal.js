import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const ThreeDotsModal = ({ isModalVisible, hideModal, setSocialModal }) => {
  const [isMute, setIsMute] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggleMute = () => {
    setIsMute((prevState) => !prevState);
    console.log("pressed mute")
  };

  const modalPosition = -490;

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutUp"
      onSwipeComplete={hideModal}
      backdropOpacity={0}
      swipeDirection="up"
      transparent
      visible={isModalVisible}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalPosition }] },
            ]}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={isMute ? styles.buttonPressed : styles.buttonNormal}
                onPress={toggleMute} // Use toggleMute function
              >
                <Text style={styles.buttonText}>Mute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNormal}
                onPress={() => {
                  console.log("Pressed share");
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNormal}
                onPress={() => {
                  console.log("Pressed Leave");
                }}
              >
                <Text style={styles.buttonText}>Leave</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.code}>M1L4N1SC00L</Text>
            <View style={{ width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder="Phone #"
                placeholderTextColor={COLORS.primary}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="numeric"
              />
            </View>
            <Bar color={COLORS.primary} />
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
    borderRadius: 50,
    padding: 20,
    height: 225,
    width: "103%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonNormal: {
    borderRadius: 30,
    width: 93,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    alignItems: "center",
  },
  buttonPressed: {
    borderRadius: 30,
    width: 93,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    alignItems: "center",
    backgroundColor: COLORS.darkersecondary,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  input: {
    height: 60,
    backgroundColor: COLORS.darkersecondary,
    padding: 10,
    borderRadius: 15,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  code: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.primary,
    paddingVertical: 5,
  },
});

export default ThreeDotsModal;