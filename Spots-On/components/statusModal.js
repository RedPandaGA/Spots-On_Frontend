import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import COLORS from "./colors";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { SelectList } from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../.config.js";


const papiUrl = Config.PAPI_URL;


const StatusModal = ({
  isModalVisible,
  hideModal,
  user,
  setUser,
  statusIdentifiers,
  getUserInfo,
}) => {
  //   const [userStatus, setUserStatus] = useState({
  //     overallStatus: 0,
  //     customDescription: "",
  //   });

  //   const [prevStatus, setPrevStatus] = useState(userStatus.overallStatus);
  const [prevStatus, setPrevStatus] = useState(user.statusCode);

  const [wantsCustomStatus, setWantsCustomStatus] = useState(false);

  const toggleCustomStatus = () => {
    if (wantsCustomStatus) {
      setWantsCustomStatus(false);
    } else {
      setWantsCustomStatus(true);
    }
  };


  const updateUserStatusCode = async () => {
    try {
      // Get the authorization token from AsyncStorage
      const authToken = await AsyncStorage.getItem('token');
      if (!authToken) {
        // Handle the case where the token is not available
        console.error('Authorization token not found.');
        return;
      }
  
      const response = await fetch(`${papiUrl}/updateStatusCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({
          statusCode: user.statusCode,
          status: user.status
        }),
      });
  
      if (!response.ok) {
        // Handle error, e.g., display an error message
        console.error('Error updating user status:', response.status);
        
        // If the server sends a JSON response, you might want to parse and log it
        try {
          const errorData = await response.json();
          console.error('Server error data:', errorData);
        } catch (parseError) {
          console.error('Error parsing server error data:', parseError);
        }
  
        return;
      }
  
      // Successfully updated user status
      console.log('User status updated successfully:', response);
      await getUserInfo();
      // If the server sends a JSON response, you might want to parse and log it
      try {
        const responseData = await response.json();
        console.log('Server response data:', responseData);
      } catch (parseError) {
        console.error('Error parsing server response data:', parseError);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors as needed
    }
  };
  

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setWantsCustomStatus(false);
        setUser({ ...user, statusCode: prevStatus });
        hideModal();
        console.log("Exited status");
      }}
      style={{ flex: 1 }}
      backdropOpacity={0.4}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Change Status</Text>
            </View>
            <View style={styles.inputContainer}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.placeholderStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={statusIdentifiers}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={statusIdentifiers[user.statusCode].label}
                value={user.statusCode}
                onChange={(item) => {
                  const statusValue = item.value - 1;
                  setUser({ ...user, statusCode: statusValue });
                  console.log(statusIdentifiers[statusValue].label);
                }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Set a custom status?</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.secondary }}
                thumbColor={wantsCustomStatus ? COLORS.gold : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleCustomStatus}
                value={wantsCustomStatus}
              />
            </View>
            <View style={styles.inputContainer}>
              {wantsCustomStatus && (
                <TextInput
                  style={styles.input}
                  placeholder="How are you feeling today?"
                  placeholderTextColor={COLORS.secondary}
                  value={user.status}
                  onChangeText={(text) => setUser({ ...user, status: text })}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonNormal}
                onPress={() => {
                  setWantsCustomStatus(false);
                  setUser({ ...user, statusCode: prevStatus });
                  hideModal();
                  console.log("Canceled changing status");
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNormal}
                onPress={() => {
                  // Save the event object or perform other actions here
                  setPrevStatus(user.statusCode);
                  if (!wantsCustomStatus) {
                    setUser({ ...user, status: "" });
                  }
                  updateUserStatusCode();
                  setWantsCustomStatus(false);
                  hideModal();
                  console.log(
                    `Status: ${
                      statusIdentifiers[user.statusCode].label
                    }, description: ${user.status}`
                  );
                  // console.log('Spot Created:\n', new);
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //   modalContainer: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "transparent",
  //   },
  modalContent: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 20,
    height: 400,
    // width: "100%",
    alignItems: "center",
    // height: "50%",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonNormal: {
    borderRadius: 30,
    width: "40%",
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
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
  inputContainer: {
    width: "100%",
    flex: 1,
  },
  input: {
    height: 60,
    borderColor: COLORS.lighterprimary,
    borderWidth: 2,
    margin: 16,
    padding: 10,
    borderRadius: 10,
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  switchContainer: {
    justifyContent: "center",
    alignContent: "space-between",
    flexDirection: "row",
  },
  switchText: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 20,
    alignSelf: "center",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: COLORS.secondary,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  placeholderStyle: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  itemTextStyle: {
    fontSize: 20,
  },
  iconStyle: {
    tintColor: COLORS.secondary,
  },
});

export default StatusModal;
