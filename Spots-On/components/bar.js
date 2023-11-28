import React from "react";
import { View, StyleSheet } from "react-native";

export default function Bar({ color, style }) {
  return <View style={[styles.bar, { backgroundColor: color }, style]}></View>;
}

const styles = StyleSheet.create({
  bar: {
    width: "60%", // Adjust the width as needed
    height: 5, // Adjust the height as needed
    borderRadius: 50,
    marginBottom: 20,
  },
});
