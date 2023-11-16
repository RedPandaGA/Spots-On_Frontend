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
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";

const ThreeDotsModal = ({ isModalVisible, hideModal, setSocialModal }) => {
  const [isMute, setIsMute] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.6;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      // Calculate the threshold based on a percentage of the screen height
      const threshold = screenHeight * percentageThreshold;
      return e.nativeEvent.pageY < threshold;
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

  const modalPosition = new Animated.Value(-510);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalPosition }] },
            ]}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={
                  isMute ? styles.buttonPressed : styles.buttonNormal
                }
                onPress={() => {
                  setIsMute(true);
                  console.log("Pressed mute");
                }}
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
            <Bar color={COLORS.primary}/>
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
    width: "95%",
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
