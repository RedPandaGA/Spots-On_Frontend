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
import ColonySliderModal from "../components/colonySliderModal";
import Carousel from "react-native-snap-carousel";

export default function LocationSharing({ navigation }) {

  const carouselData = [
    {
      title: "Device Permissions",
      text: "Spots-On! requires your device's location permissions to be ON for the app to work. Go into your phone's settings to allow this.",
      imagePath: require("../assets/phone.png"),
    },
    {
      title: "Location Sharing",
      text: "This must be turned ON so Colony members can see you on the map.",
      imagePath: require("../assets/marker.png"),
    },
    {
      title: "Status Sharing",
      text: "This must be turned ON so Colony members can see what you're up to.",
      imagePath: require("../assets/sensor.png"),
    },
  ];

  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <View style={styles.cardContainer}>
          <Image source={item.imagePath} style={styles.cardImage} />
          <View style={styles.textContent}>
            <Text style={styles.carouselTitle}>{item.title}</Text>
            <Text style={styles.carouselText}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  const hibernationList = ["Location sharing", "Status sharing"];

  const locationList = ["friend1", "friend2", "friend3"];

  const statusList = ["friend1", "friend2", "friend3"];

  const [hibernationSwitches, setHibernationSwitches] = useState({
    location: false,
    status: false,
  });

  const [statusSwitches, setStatusSwitches] = useState({
    friend1: false,
    friend2: false,
    friend3: false,
  });

  const [locationSwitches, setLocationSwitches] = useState({
    friend1: false,
    friend2: false,
    friend3: false,
  });

  const handleHibernationToggle = (name) => {
    setHibernationSwitches((prevSwitches) => ({
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

  const handleStatusToggle = (name) => {
    setStatusSwitches((prevSwitches) => ({
      ...prevSwitches,
      [name]: !prevSwitches[name],
    }));
    console.log(`Toggle switch for ${name} clicked`);
  };

  const renderHibernationToggleBox = (text, index) => {
    return (
      <View style={styles.toggleContainer} key={`status_${index}`}>
        <Text style={styles.toggleText}>{text}</Text>
        <Switch
          style={styles.toggleSwitch}
          value={hibernationSwitches[text]}
          onValueChange={() => handleHibernationToggle(text)}
          trackColor={{
            false: COLORS.darkerprimary, // color when switch is off
            true: COLORS.gold, // color when switch is on
          }}
          thumbColor={hibernationSwitches[text] ? COLORS.white : COLORS.lighterprimary}
        />
      </View>
    );
  };

  const renderStatusToggleBox = (text, index) => {
    return (
      <View style={styles.toggleContainer} key={`location_${index}`}>
        <Text style={styles.toggleText}>{text}</Text>
        <Switch
          style={styles.toggleSwitch}
          value={statusSwitches[text]}
          onValueChange={() => handleStatusToggle(text)}
          trackColor={{
            false: COLORS.darkerprimary, // color when switch is off
            true: COLORS.gold, // color when switch is on
          }}
          thumbColor={statusSwitches[text] ? COLORS.white : COLORS.lighterprimary}
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
          thumbColor={locationSwitches[text] ? COLORS.white : COLORS.lighterprimary}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed back button");
              navigation.navigate("Settings");
            }}
          >
            <View style={styles.backButton}>
              <Image
                source={require("../assets/back-button-secondary-color.png")}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Sharing</Text>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={carouselData}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={370}
            layout="default"
            snapToAlignment="start"
            snapToInterval={400}
          />
        </View>
        <View style={styles.sliderContainer}>
          <ColonySliderModal />
        </View>
        <Text style={styles.subtitle}>Sharing to Colony</Text>
        <View style={styles.settingsItems}>
          {hibernationList.map((buttonText, index) =>
            renderHibernationToggleBox(buttonText, index)
          )}
        </View>
        <Text style={styles.subtitle}>Sharing location to colony members</Text>
        <View style={styles.settingsItems}>
          {locationList.map((buttonText, index) =>
            renderStatusToggleBox(buttonText, index)
          )}
        </View>
        <Text style={styles.subtitle}>Sharing status to colony members</Text>
        <View style={[styles.settingsItems, { marginBottom: 20 }]}>
          {statusList.map((buttonText, index) =>
            renderLocationToggleBox(buttonText, index)
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
    textAlign: "center",
    fontWeight: "bold",
    width: "60%",
    // marginLeft: 20,
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
  sliderContainer: {
    width: "110%",
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
});
