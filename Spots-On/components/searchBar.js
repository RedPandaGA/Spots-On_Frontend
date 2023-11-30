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
    width: "90%",
    borderRadius: 50,
    paddingVertical: 14,
    paddingRight: 10,
    paddingLeft: 20,
    backgroundColor: "rgba(44, 103, 101, .8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 13,
  },
  input: {
    height: 45,
    width: "100%",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 25,
    height: 25,
    right: 40,
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
