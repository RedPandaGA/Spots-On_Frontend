import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import COLORS from "../components/colors";

export default function ColonyManagement({ navigation }) {
  const detailList = ["Edit Colony Name"];

  const detailButtonActions = [
    () => {
      console.log("editing colony name");
    },
  ];

  //gotta change admin to a real role
  const mngmntList = [
    "My Role: " + "admin",
    "Change Admin Status",
    "Add Colony Members",
    "Delete Colony Members",
    "Set Spot access",
    "Leave Colony",
  ];

  const mngmntButtonActions = [
    () => {
      console.log("my role clicked");
    },
    () => {
      console.log("change admin status clicked");
    },
    () => {
      console.log("add colony members clicked");
    },
    () => {
      console.log("delete colony members clicked");
    },
    () => {
      console.log("set bubble access clicked");
    },
    () => {
      console.log("leave colony clicked");
    },
  ];

  const renderDetailButton = (text, index) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={detailButtonActions[index]}
        key={text}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderMngmntButton = (text, index) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={mngmntButtonActions[index]}
        key={text}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
              console.log("Pressed back button");
            }}
          >
            <View style={styles.backButton}>
              <Image
                source={require("../assets/backButton.png")}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>ColonyName</Text>
        </View>
        <Text style={styles.subtitle}>Colony details</Text>
        <View style={styles.settingsItems}>
          {detailList.map((buttonText, index) =>
            renderDetailButton(buttonText, index)
          )}
        </View>
        <Text style={styles.subtitle}>Colony Management</Text>
        <View style={styles.settingsItems}>
          {mngmntList.map((buttonText, index) =>
            renderMngmntButton(buttonText, index)
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    marginTop: 50,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "center",
  },
  subtitle: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: -15,
    paddingTop: 20,
    opacity: 0.9,
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 20,
    tintColor: COLORS.secondary
  },
  settingsItems: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
  },
  buttons: {
    justifyContent: "center",
    paddingVertical: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
