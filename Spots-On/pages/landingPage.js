import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import COLORS from "../components/colors";

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
          source={require("../assets/discover.gif")}
          style={styles.image}
        />
        <Text style={styles.text}>Discover</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../assets/share.gif")}
          style={styles.shareImage}
        />
        <Text style={styles.text}>Plan</Text>
      </View>
      <View style={styles.slide}>
  <Image
    source={require("../assets/connect.gif")}
    style={styles.image}
  />
  <Text style={styles.text}>Connect</Text>
  <View style={styles.bottomContent}>
    <Text style={styles.smallText}>your colony, your rules</Text>
    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
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
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.gold,
    fontSize: 40,
    fontWeight: "bold",
  },
  smallText: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: "bold",
    bottom: 70
  },
  button: {
    borderRadius: 30,
    height: 48,
    width: "70%",
    backgroundColor: COLORS.darkerprimary,
    alignItems: "center",
    position: "absolute",
    bottom: "30%",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12,
  },
  paginationDot: {
    backgroundColor: COLORS.darkerprimary, // Change the color of inactive dots
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activePaginationDot: {
    backgroundColor: COLORS.secondary, // Change the color of active dot
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
    tintColor: COLORS.secondary
  },
  shareImage: {
    marginBottom: 30,
    resizeMode: "stretch",
    left: 20,
    top: 30,
    width: 256,
    height: 256,
    tintColor: COLORS.secondary
  },
  bottomContent: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});

export default LandingPage;
