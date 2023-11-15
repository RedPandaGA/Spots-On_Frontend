import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";

const LandingPage = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to the create account screen
    navigation.navigate("Signup");
  };

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      dotStyle={styles.paginationDot}
      activeDotStyle={styles.activePaginationDot}
    >
      <View style={styles.slide}>
        <Image
          source={require("../assets/calendar.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Plan</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../assets/communication.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Meet</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../assets/networking.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Connect</Text>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.createAccountButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C6765",
  },
  text: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  createAccountButton: {
    position: "absolute",
    bottom: 150,
    padding: 10,
    backgroundColor: "#305c5c",
    borderRadius: 10,
    width: 200,
  },
  createAccountButtonText: {
    color: "#E7EFCA",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  paginationDot: {
    backgroundColor: "#305c5c", // Change the color of inactive dots
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activePaginationDot: {
    backgroundColor: "#E7EFCA", // Change the color of active dot
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  image: {
    marginBottom: 30,
    resizeMode: "stretch",
    width: 256,
    height: 256,
  },
});

export default LandingPage;
