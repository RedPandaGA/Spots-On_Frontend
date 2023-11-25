import React from "react";
import { Circle, Marker, Callout, CalloutSubview } from "react-native-maps";
import { View, Image, Text, StyleSheet } from "react-native";
import COLORS from "./colors";

const Spot = ({
  coordinate,
  spotName,
  colonyName,
  isSafe,
  spotRadius,
  onDrag,
  onDragEnd,
  showModal,
  setCurrentSpot,
  isEditSpotVisible,
}) => {
  const chosenSpot = {
    spotName: spotName,
    coordinate: coordinate,
    colonyName: colonyName,
    safe: isSafe,
    radius: spotRadius,
  };

  return (
    <View>
      <Marker
        draggable
        coordinate={coordinate}
        title={spotName}
        description={colonyName}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onPress={() => {
          if (setCurrentSpot) setCurrentSpot(chosenSpot);
        }}
      >
        <Image
          source={require("../assets/marker.png")}
          style={{ width: 30, height: 30, tintColor: COLORS.red }}
        />
        <Callout
          style={styles.callout}
          onPress={() => {
            if (showModal) showModal("editSpot");
            console.log("Clicked description/spot info");
            console.log("Chosen spot:", chosenSpot);
          }}
        >
          <View style={styles.calloutTextContainer}>
            <Text style={styles.spotName}>{spotName}</Text>
            <Text style={styles.colonyName}>{colonyName}</Text>
          </View>
          <View style={styles.calloutImageContainer}>
            <Image
              source={require("../assets/info.png")}
              style={styles.infoImage}
            />
          </View>
        </Callout>
      </Marker>
      <Circle
        center={coordinate}
        radius={spotRadius}
        strokeWidth={1}
        strokeColor={isSafe ? "#2C6765" : "#FF5555"}
        fillColor={isSafe ? "rgba(44, 103, 101, .3)" : "rgba(255, 85, 85, .3)"} // transparent versions of COLORS.primary/COLORS.active
      />
    </View>
  );
};

export default Spot;

const styles = StyleSheet.create({
  callout: {
    minWidth: 150,
    minHeight: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calloutTextContainer: {
    flex: 1,
    // padding: 10,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  colonyName: {
    fontSize: 14,
    color: "#1e1e1e",
  },
  calloutImageContainer: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  editImage: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
    marginBottom: 10,
  },
  infoImage: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
});
