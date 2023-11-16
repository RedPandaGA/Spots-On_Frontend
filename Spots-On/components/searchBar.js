import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import COLORS from "./colors";

export default function SearchBar({ imageSource, style, color }) {
  return (
    <View style={[style, styles.shadow]}>
      <View style={styles.button}>
        <TextInput
          style={styles.input}
          placeholder="Search for groups or people"
          placeholderTextColor={COLORS.white}
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
    width: 285,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "rgba(44, 103, 101, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 45,
    width: 250,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
    right: 20,
  },
  shadow: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
});
