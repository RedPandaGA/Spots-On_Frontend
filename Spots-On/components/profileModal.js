import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const ProfileModal = ({ isModalVisible, hideModal }) => {

  const modalPosition = -425

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
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalPosition }] },
            ]}
          >
        <Image source={require("../assets/profilePicture.png")} style={styles.profilePicture} />
          <Text style={styles.nameText}>Faris Khattak</Text>
          <Text style={styles.statusText}>dont talk to me. studying</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log("pressed block");
                }}
              >
                <Text style={styles.buttonText}>Block</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log("Pressed call");
                }}
              >
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
            </View>
            <Bar color={COLORS.primary} />
          </Animated.View>
        </View>
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
    paddingTop: 70,
    height: "55%",
    width: "111%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
    paddingBottom: 15
  },
  button: {
    borderRadius: 30,
    width: 145,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    alignItems: "center",
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
  profilePicture: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 5,
    borderColor: COLORS.red,
    borderWidth: 5
  },
  nameText: {
    color: COLORS.primary,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 15
  }
});

export default ProfileModal;
