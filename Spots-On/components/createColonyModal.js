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

const CreateColonyModal = ({ isModalVisible, hideModal, showModal }) => {
  const [isPrivateColony, setIsPrivateColony] = useState(true);
  const [isPublicColony, setIsPublicColony] = useState(false);

  const [colonyName, setColonyName] = useState("");

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.6; // Adjust the percentage as needed

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
                  isPublicColony ? styles.buttonPressed : styles.buttonNormal
                }
                onPress={() => {
                  setIsPrivateColony(false);
                  setIsPublicColony(true);
                  console.log("Pressed Public");
                }}
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
                hideModal();
              }}
            >
              <Text style={styles.buttonText}>Create Colony</Text>
            </TouchableOpacity>
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
    tintColor: COLORS.primary
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
});

export default CreateColonyModal;
