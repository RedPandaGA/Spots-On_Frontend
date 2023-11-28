import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import COLORS from "../components/colors";
import { Dropdown } from "react-native-element-dropdown";
import Swiper from "react-native-swiper";

export default function ColonyManagement({ navigation, route}) {
    const {colonies} = route.params;

  const carouselData = [
    {
      title: "Colony Details",
      text: "Changes you make here apply only to the selected Colony.",
      imagePath: require("../assets/details.png"),
    },
    {
      title: "Colony Management",
      text: "Only admins can edit Colony names, delete Colony members, and change admin status.",
      imagePath: require("../assets/management.png"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderCarouselItems = () => {
    return carouselData.map((item, index) => (
      <View style={styles.carouselItem} key={`carousel_item_${index}`}>
        <View style={styles.cardContainer}>
          <Image source={item.imagePath} style={styles.cardImage} />
          <View style={styles.textContent}>
            <Text style={styles.carouselTitle}>{item.title}</Text>
            <Text style={styles.carouselText}>{item.text}</Text>
          </View>
        </View>
      </View>
    ));
  };

  const [selectedColony, setSelectedColony] = useState(null);

//   const colonies = [
//     { name: "Colony A", value: "colonyA" },
//     { name: "Colony B", value: "colonyB" },
//     { name: "Colony C", value: "colonyC" },
//     // Add more colonies as needed
//   ];

  const detailList = ["Edit Colony Name"];

  const detailButtonActions = [
    () => {
      console.log("editing colony name");
    },
  ];

  //gotta change admin to a real role
  const mngmntList = [
    "My Role: " + "Creator",
    "Edit Permissions",
    "Manage Members",
    // "Delete Colony Members",
    // "Set Spot access",
    "Leave Colony",
  ];

  const mngmntButtonActions = [
    () => {
      console.log("my role clicked");
    },
    // () => {
    //   console.log("change admin status clicked");
    // },
    () => {
      console.log("edit permissions clicked");
    },
    () => {
      console.log("manage members clicked");
    },
    // () => {
    //   console.log("delete colony members clicked");
    // },
    // () => {
    //   console.log("set bubble access clicked");
    // },
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
              navigation.navigate("Settings", {colonies: colonies});
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
        <View style={[styles.carouselContainer, { height: 170 }]}>
          <Swiper
            loop={false}
            index={currentIndex}
            onIndexChanged={(index) => setCurrentIndex(index)}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
          >
            {renderCarouselItems()}
          </Swiper>
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.placeholderStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={colonies}
            search={false}
            maxHeight={300}
            labelField="name"
            valueField="value"
            placeholder={selectedColony ? selectedColony.name : "Select Colony Name"}
            onChange={(item) => {
              setSelectedColony(item);
            }}
          />
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
    marginBottom: 10,
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
  carouselContainer: {
    marginVertical: 25,
    alignItems: 'center',
  },
  carouselItem: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    height: 120,
    padding: 15,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: "center",
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: 'left',
  },
  carouselText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: COLORS.gold
  },
  textContent: {
    flex: 1, // Take the remaining space
    justifyContent: 'center',
  },
  inputContainer: {
    width: "98%",
    flex: 1,
    marginTop: -40,
    marginBottom: -10,
    alignSelf: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: COLORS.secondary,
    borderBottomWidth: 1,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 20,
    marginLeft: -10,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  itemTextStyle: {
    fontSize: 20,
  },
  iconStyle: {
    tintColor: COLORS.secondary,
  },
  dot: {
    backgroundColor: COLORS.lighterprimary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.secondary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
