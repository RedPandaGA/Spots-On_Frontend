import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "@env";
import COLORS from "./colors";
import { SafeAreaView } from "react-native";

const GooglePlacesInput = ({
  textInputStyle,
  containerStyle,
  placeholderText,
  placeholderTextColor,
  handleInputChange,
}) => {
  const handlePlaceSelected = (place) => {
    const { name, formatted_address, geometry } = place;
    const { location } = geometry;
    const coordinate = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    handleInputChange("address", formatted_address);
    handleInputChange("coordinate", coordinate);
  };

  return (
    <GooglePlacesAutocomplete
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log("Data:\n", data);
        console.log("Details:\n", details);
        console.log("Address:", details.formatted_address);
        console.log("Latitude:", details.geometry.location.lat);
        console.log("Longitude:", details.geometry.location.lng);
        // coordinate = {
        //   latitude: details.geometry.location.lat,
        //   longitude: details.geometry.location.lng,
        // };
        // address = details.formatted_address;
        // handleInputChange("coordinate", coordinate);
        // handleInputChange("address", address);
        handlePlaceSelected(details);
      }}
      query={{
        key: PLACES_API_KEY,
        language: "en",
      }}
      fetchDetails={true}
      placeholder={placeholderText}
      textInputProps={{
        placeholderTextColor: placeholderTextColor,
        returnKeyType: "search",
      }}
      isRowScrollable={true}
      styles={{
        container: [
          {
            flex: 1,
            marginBottom: 10,
          },
          containerStyle,
        ],
        textInput: textInputStyle,
        poweredContainer: {
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: "#c8c7cc",
          borderTopWidth: 0.5,
        },
        powered: {},
        listView: {},
        row: {
          backgroundColor: "#FFFFFF",
          padding: 13,
          height: 44,
          flexDirection: "row",
        },
        separator: {
          height: 0.5,
          backgroundColor: "#c8c7cc",
        },
        description: {},
        loader: {
          flexDirection: "row",
          justifyContent: "flex-end",
          height: 20,
        },
      }}
      onFail={(error) => console.log(error)}
    />
  );
};

export default GooglePlacesInput;
