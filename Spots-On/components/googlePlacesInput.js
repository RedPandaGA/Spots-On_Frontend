import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "@env";
import COLORS from "./colors";

const GooglePlacesInput = ({
  textInputStyle,
  placeholderText,
  placeholderTextColor,
  addressValue,
  coordinateValue,
  handleInputChange,
}) => {
  return (
    <GooglePlacesAutocomplete
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log("Data:\n", data);
        console.log("Details:\n", details);
        console.log("Address:", details.formatted_address);
        console.log("Latitude:", details.geometry.location.lat);
        console.log("Longitude:", details.geometry.location.lng);
        coordinate = {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        };
        address = details.formatted_address;
        handleInputChange("coordinate", coordinate);
        handleInputChange("address", address);
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
      styles={{
        container: {
          flex: 1,
          marginBottom: 10,
        },
        textInput: textInputStyle,
      }}
    />
  );
};

export default GooglePlacesInput;
