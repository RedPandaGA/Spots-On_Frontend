import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import COLORS from "./colors";

export default function SearchBar({ imageSource, style, color }) {
  return (
    <View style={[style, styles.shadow]}>
      <View style={styles.button}>
        <TextInput
          style={styles.input}
          placeholder="Search for colonies"
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
    width: "89%",
    borderRadius: 50,
    paddingVertical: 14,
    paddingRight: 10,
    paddingLeft: 20,
    backgroundColor: "rgba(44, 103, 101, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16.5,
    opacity: 0.8,
  },
  input: {
    height: 45,
    width: "100%",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 20,
    height: 20,
    right: 25,
  },
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
});
