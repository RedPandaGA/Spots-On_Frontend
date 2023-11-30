import React, { useState, useEffect } from "react";
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
  setUsers,
  getUsersInColony,
  findSelectedColony,
  filteredColonies,
  setFilteredColonies,
  renderUsersOnMap,
}) {
  useEffect(() => {
    async function grabColonyInfo() {
      if (Object.keys(findSelectedColony(colonies)).length > 0) {
        setSpots(await getSpots());
        setUsers(await getUsersInColony());
        renderUsersOnMap();
      }
    }
    grabColonyInfo();
  }, [colonies]);

  const onPress = async (name) => {
    // Update the selected state for each colony
    const updatedFilteredColony = filteredColonies.map((item) => ({
      ...item,
      selected: item.name === name,
    }));
    const updatedColony = colonies.map((item) => ({
      ...item,
      selected: item.name === name,
    }));
    setColonies(updatedColony);

    setFilteredColonies(updatedFilteredColony);
    //console.log("colonies: " + JSON.stringify(colonies));
  };

  return (
    <View style={style}>
      <FlatList
        style={styles.list}
        horizontal
        data={filteredColonies}
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
    // paddingVertical: 2,
    paddingHorizontal: 15,
    height: 35,
    minWidth: 100,
    opacity: 0.9,
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
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
  },
  list: {
    marginLeft: 14,
  },
});
