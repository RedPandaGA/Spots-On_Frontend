import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import COLORS from "./colors";

export default function SearchBarModal({ imageSource, style, color }) {
  return (
    <View style={[style, styles.shadow]}>
      <View style={styles.button}>
        <TextInput
          style={styles.input}
          placeholder="Search for groups or people"
          placeholderTextColor={COLORS.primary}
          // value={searchText}
          // onChangeText={setSearchText}
        />
        <Image source={imageSource} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 300,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 45,
    width: 250,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
    right: 5,
    tintColor: COLORS.primary,
  },
  shadow: {
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
});
