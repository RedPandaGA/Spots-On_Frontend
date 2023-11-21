import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import COLORS from "../components/colors";

const Splash = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  const flutterAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    flutterAnimation();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/ladybugfixed.png")}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    resizeMode: "stretch",
    width: 128,
    height: 128,
  },
});

export default Splash;
