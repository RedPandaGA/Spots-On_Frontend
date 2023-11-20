import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import COLORS from "../components/colors";

export default function Account({ navigation }) {

  const detailList = ["Edit Phone Number", "Edit Email Address", "Change Password"];

  const detailButtonActions = [
    () => {
      console.log("edit phone number clicked");
    },
    () => {
      console.log("edit email address clicked");
    },
    () => {
      console.log("change password clicked");
    },
  ];

  const otherList = ["Go Premium", "Delete Account"];

  const otherButtonActions = [
    () => {
      console.log("go premium clicked");
    },
    () => {
      console.log("delete account clicked");
    }
  ];

  const renderDetailButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={detailButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderOtherButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={otherButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Settings");
            console.log("Pressed back button");
          }}>
            <View style={styles.backButton}>
              <Image
                source={require("../assets/backButton.png")}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Account</Text>
        </View>
        <Image source={require("../assets/profilePicture.png")} style={styles.profilePicture} />
        <TouchableOpacity>
        <Image source={require("../assets/editIcon.png")} style={styles.editIcon1}/>
        </TouchableOpacity>
        <View>
          <Text style={styles.nameText}>Faris Khattak</Text>
          <TouchableOpacity>
          <Image source={require("../assets/editIcon.png")} style={styles.editIcon2} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingsItems}>
          {detailList.map((buttonText, index) => renderDetailButton(buttonText, index))}
        </View>
        <View style={styles.settingsItems}>
          {otherList.map((buttonText, index) => renderOtherButton(buttonText, index))}
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
    alignSelf: "center",
  },
  nameText: {
    color: COLORS.secondary,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
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
  profilePicture: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  editIcon1: {
    height: 40,
    width: 40,
    tintColor: COLORS.gold,
    position: "absolute",
    top: -60,
    left: 240,
  },
  editIcon2: {
    height: 30,
    width: 30,
    tintColor: COLORS.gold,
    position: "absolute",
    right: 15,
    bottom: 3
  }
})

