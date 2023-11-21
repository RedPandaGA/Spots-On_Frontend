import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import COLORS from "./colors";

export default function ColonySlider({
  style,
  colonies,
  setColonies,
  getSpots,
  spots,
  setSpots,
}) {
  const onPress = async (name) => {
    console.log("beforeUpdated: " + JSON.stringify(colonies));
    // Update the selected state for each colony
    const updatedColony = colonies.map((item) => ({
      ...item,
      selected: item.name === name,
    }));
    console.log("updated: " + JSON.stringify(updatedColony));
    setColonies(updatedColony);
    console.log("afterUpdated: " + JSON.stringify(colonies));
    setSpots(await getSpots());
    console.log("wot: " + JSON.stringify(spots));
  };

  return (
    <View style={style}>
      <FlatList
        style={styles.list}
        horizontal
        data={colonies}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              item.selected ? styles.selected : "",
            ]}
            onPress={() => onPress(item.name)}
          >
            <Text
              style={[styles.text, item.selected ? styles.selectedText : ""]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingVertical: 11,
    paddingHorizontal: 10,
    height: 45,
    minWidth: 100,
  },
  selected: {
    backgroundColor: COLORS.secondary,
  },
  selectedText: {
    color: COLORS.primary,
  },
  shadow: {
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  list: {
    marginLeft: 16,
  },
});
