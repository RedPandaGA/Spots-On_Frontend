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
import Bar from "./bar"; // Import any necessary components and styles
import COLORS from "./colors";

const ThreeDotsModal = ({ isModalVisible, hideModal, setSocialModal }) => {
  const [isPrivateColony, setIsPrivateColony] = useState(true);
  const [isPublicColony, setIsPublicColony] = useState(false);
  const [colonyName, setColonyName] = useState("");

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.6;

  const panResponder = PanResponder.create({
    // ...PanResponder logic remains the same
  });

  const modalPosition = new Animated.Value(0);

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
            <Bar color={"#2C6765"} />
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                  setSocialModal(true);
                  console.log("Pressed back button to social");
                }}
              >
                <Image
                  source={require("../assets/backButton.png")}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Create Colony</Text>
            </View>
            {/* Rest of the content remains the same */}
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
    borderWidth: 1.5,
    borderColor: "#ccc",
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPressed: {
    borderRadius: 30,
    width: 160,
    borderWidth: 1.5,
    borderColor: "#ccc",
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "rgba(44, 103, 101, .2)",
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
    tintColor: COLORS.primary
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ThreeDotsModal;
