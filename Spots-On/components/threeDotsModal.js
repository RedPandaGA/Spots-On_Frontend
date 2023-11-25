import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";
import { useRoute } from '@react-navigation/native';

const ThreeDotsModal = ({ isModalVisible, hideModal }) => {
  const [isMute, setIsMute] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [modalPosition, setModalPosition] = useState(-490);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setModalPosition(-220); // Set a position that suits your layout
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setModalPosition(-490); // Restore initial position when keyboard hides
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  const route = useRoute();
  const { item } = route.params;

  const toggleMute = () => {
    setIsMute((prevState) => !prevState);
    console.log("pressed mute");
  };

  const handleSendInput = () => {
    console.log("Sending input:", phoneNumber);
    setPhoneNumber("");
  };

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutUp"
      onSwipeComplete={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0}
      swipeDirection="up"
      isVisible={isModalVisible}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
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
        <Text style={styles.code}>{item.code}</Text>
        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.input}
            placeholder="Phone #"
            placeholderTextColor={COLORS.primary}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleSendInput}>
            <Image
              source={require("../assets/backButton.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <Bar color={COLORS.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingTop: 90,
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    padding: 20,
    height: 225,
    width: "100%",
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
  backButton: {
    position: "absolute",
    height: 50,
    width: 50,
    tintColor: COLORS.primary,
    top: -67,
    right: 5,
    transform: [{ scaleX: -1 }],
  },
});

export default ThreeDotsModal;
