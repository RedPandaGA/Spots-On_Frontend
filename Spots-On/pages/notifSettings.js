import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import COLORS from "../components/colors";
import Swiper from "react-native-swiper";
import { Dropdown } from "react-native-element-dropdown";

export default function Notifications({ navigation, route }) {
  const { colonies } = route.params;

  const carouselData = [
    {
      title: "Status Notifications",
      text: "Receive notifications when a Colony member's status is updated.",
      imagePath: require("../assets/sensor.png"),
    },
    {
      title: "Location Notifications",
      text: "Receive notifications when a Colony member's location is updated.",
      imagePath: require("../assets/marker.png"),
    },
    {
      title: "Colony Notifications",
      text: "Receive notifications when Colony members arrive or leave a Spot- like home, school, or work.",
      imagePath: require("../assets/spots.png"),
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

  const statusList = ["michelle", "Milan", "Richard"];

  const locationList = ["michelle", "Milan", "Richard"];

  const [statusSwitches, setStatusSwitches] = useState({
    friend1: false,
    friend2: false,
    friend3: false,
  });

  const [locationSwitches, setLocationSwitches] = useState({
    friend1location: false,
    friend2location: false,
    friend3location: false,
  });

  const handleStatusToggle = (name) => {
    setStatusSwitches((prevSwitches) => ({
      ...prevSwitches,
      [name]: !prevSwitches[name],
    }));
    console.log(`Toggle switch for ${name} clicked`);
  };

  const handleLocationToggle = (name) => {
    setLocationSwitches((prevSwitches) => ({
      ...prevSwitches,
      [name]: !prevSwitches[name],
    }));
    console.log(`Toggle switch for ${name} clicked`);
  };

  const spotsList = ["Edit your Spots notifications on the Main Map page"];

  const renderStatusToggleBox = (text, index) => {
    return (
      <View style={styles.toggleContainer} key={`status_${index}`}>
        <Text style={styles.toggleText}>{text}</Text>
        <Switch
          style={styles.toggleSwitch}
          value={statusSwitches[text]}
          onValueChange={() => handleStatusToggle(text)}
          trackColor={{
            false: COLORS.darkerprimary, // color when switch is off
            true: COLORS.gold, // color when switch is on
          }}
          thumbColor={
            statusSwitches[text] ? COLORS.white : COLORS.lighterprimary
          }
        />
      </View>
    );
  };

  const renderLocationToggleBox = (text, index) => {
    return (
      <View style={styles.toggleContainer} key={`location_${index}`}>
        <Text style={styles.toggleText}>{text}</Text>
        <Switch
          style={styles.toggleSwitch}
          value={locationSwitches[text]}
          onValueChange={() => handleLocationToggle(text)}
          trackColor={{
            false: COLORS.darkerprimary, // color when switch is off
            true: COLORS.gold, // color when switch is on
          }}
          thumbColor={
            locationSwitches[text] ? COLORS.white : COLORS.lighterprimary
          }
        />
      </View>
    );
  };

  const renderSpotsToggleBox = (text, index) => {
    return (
      <TouchableOpacity
        style={styles.spotsNotifButton}
        onPress={() => {
          console.log("Main Map redirection clicked");
          navigation.navigate("Home");
        }}
        key={`spots_${index}`}
      >
        <Text style={styles.toggleText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed back button");
              navigation.navigate("Settings", { colonies: colonies });
            }}
          >
            <View style={styles.backButton}>
              <Image
                source={require("../assets/backButton.png")}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
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
            placeholder={
              selectedColony ? selectedColony.name : "Select Colony Name"
            }
            onChange={(item) => {
              setSelectedColony(item);
            }}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Status notifications</Text>
          <View style={styles.settingsItems}>
            {statusList.map((buttonText, index) =>
              renderStatusToggleBox(buttonText, index)
            )}
          </View>
          <Text style={styles.subtitle}>Location notifications</Text>
          <View style={styles.settingsItems}>
            {locationList.map((buttonText, index) =>
              renderLocationToggleBox(buttonText, index)
            )}
          </View>
          <Text style={styles.subtitle}>Spots notifications</Text>
          <View style={[styles.settingsItems, { marginBottom: 20 }]}>
            {spotsList.map((buttonText, index) =>
              renderSpotsToggleBox(buttonText, index)
            )}
          </View>
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
    textAlign: "center",
    fontWeight: "bold",
    width: "75%",
    marginLeft: 20,
    alignSelf: "center",
  },
  subtitle: {
    color: COLORS.status,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: -15,
    paddingTop: 20,
    opacity: 0.9,
  },
  specialText: {
    color: COLORS.status,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.9,
    paddingHorizontal: 30,
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 20,
    top: 3,
    tintColor: COLORS.secondary,
  },
  settingsItems: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
  },
  toggleContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 20,
    padding: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  toggleSwitch: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 20,
  },
  spotsNotifButton: {
    marginVertical: 10,
    padding: 10,
  },
  carouselContainer: {
    marginVertical: 25,
    alignItems: "center",
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
    textAlign: "left",
  },
  carouselText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: COLORS.gold,
  },
  textContent: {
    flex: 1, // Take the remaining space
    justifyContent: "center",
  },
  inputContainer: {
    width: "98%",
    flex: 1,
    marginTop: -40,
    marginBottom: -10,
    alignSelf: "center",
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
