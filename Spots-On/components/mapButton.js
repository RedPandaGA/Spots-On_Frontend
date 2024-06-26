import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import COLORS from "./colors";

export default function MapButton({
  imageSource,
  onPress,
  style,
  width,
  height,
  active,
}) {
  let backgroundColor = "rgba(44, 103, 101, 1)";
  if (active) {
    backgroundColor = "rgba(255, 85, 85, 1)";
  }

  return (
    <View style={[style, styles.shadow]}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.button,
            { width: width, height: height, backgroundColor: backgroundColor },
          ]}
        >
          <Image source={imageSource} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    opacity: 0.8,
  },
  image: {
    width: 23,
    height: 23,
  },
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderRadius: 50,
  },
});
