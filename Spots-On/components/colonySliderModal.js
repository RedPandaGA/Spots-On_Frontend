import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import COLORS from "./colors";

export default function ColonySliderModal({ style }) {
  const [colony, setColony] = useState([
    { name: "SASE", key: 1 },
    { name: "lsu engineering", key: 2 },
    { name: "swim friends", key: 3 },
    { name: "ood group", key: 4 },
    { name: "best friends", key: 5 },
    { name: "volleyball", key: 6 },
    { name: "oopah", key: 7 },
    { name: "vsa", key: 8 },
  ]);

  const onPress = (name) => {
    console.log(name);
  };

  return (
    <View style={style}>
      <FlatList
        style={styles.list}
        horizontal
        data={colony}
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
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 11,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
    height: 45,
    minWidth: 100,
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
  },
});
