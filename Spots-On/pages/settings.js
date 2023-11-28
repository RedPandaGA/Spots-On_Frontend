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

export default function Settings({ navigation }) {
  const colonyList = [
    "Notifications",
    "Colony Management",
    "Location/Status Sharing",
  ];

  const colonyButtonActions = [
    () => {
      console.log("Notifications clicked");
      navigation.navigate("Notifications");
    },
    () => {
      console.log("Colony management clicked");
      navigation.navigate("ColonyManagement");
    },
    () => {
      console.log("Location sharing clicked");
      navigation.navigate("LocationSharing");
    },
  ];

  const universalList = ["Account", "Privacy & Security", "About", "Log Out"];

  const universalButtonActions = [
    () => {
      console.log("Account clicked");
      navigation.navigate("Account");
    },
    () => {
      console.log("Privacy & Security clicked");
    },
    () => {
      console.log("About clicked");
    },
    () => {
      console.log("Log out clicked");
      navigation.navigate("Login");
    },
  ];

  const renderColonyButton = (text, index) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={colonyButtonActions[index]}
        key={text}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderUniversalButton = (text, index) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={universalButtonActions[index]}
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
              navigation.navigate("Home");
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
          <Text style={styles.title}>Settings</Text>
        </View>
        <Text style={styles.subtitle}>ColonyName settings</Text>
        <View style={styles.settingsItems}>
          {colonyList.map((buttonText, index) =>
            renderColonyButton(buttonText, index)
          )}
        </View>
        <Text style={styles.subtitle}>Universal settings</Text>
        <View style={styles.settingsItems}>
          {universalList.map((buttonText, index) =>
            renderUniversalButton(buttonText, index)
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
    letterSpacing: 1,
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
    tintColor: COLORS.secondary,
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
