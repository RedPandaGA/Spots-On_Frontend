import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import COLORS from "./colors";

export default function ColonySliderModal({
  style,
  colonies,
  setColonies,
  getSpots,
  spots,
  setSpots,
  setUsers,
  getUsersInColony,
  findSelectedColony,
}) {
  useEffect(() => {
    async function grabColonyInfo() {
      if (Object.keys(findSelectedColony(colonies)).length > 0) {
        setSpots(await getSpots());
        setUsers(await getUsersInColony());
      }
    }
    grabColonyInfo();
  }, [colonies]);

  const onPress = async (name) => {
    // Update the selected state for each colony
    const updatedColony = colonies.map((item) => ({
      ...item,
      selected: item.name === name,
    }));
    setColonies(updatedColony);
    //console.log("colonies: " + JSON.stringify(colonies));
  };

  return (
    <View style={style}>
      <FlatList
        style={styles.list}
        horizontal
        data={colonies}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => onPress(item.name)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    // paddingVertical: 2,
    paddingHorizontal: 15,
    height: 35,
    minWidth: 100,
    opacity: 0.9,
  },
  shadow: {
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  list: {
    marginRight: 20,
    marginLeft: 3,
  },
});
