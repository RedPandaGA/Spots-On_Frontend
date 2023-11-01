import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Drawer from "../components/drawer";
import SearchBar from "../components/searchBar";

export default function friendsList() {
    const [mapRegion, setmapRegion] = useState({
        latitude: 30.4133,
        longitude: -91.1800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 30.41,
        longitude: -91.18,
    });

    let locationsOfInterest = [
        {
            title: "First",
            location: {
                latitude: 30.4077,
                longitude: -91.17989,
            },
            description: "Patrick F Taylor Hall"
        },
        {
            title: "Second",
            location: {
                latitude: 30.412035,
                longitude: -91.183815,
            },
            description: "Tiger Stadium"
        }
    ];

    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            return (
                <Marker 
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                />
            )
        });
    };

    return(
        <View>
            {/* Main Map */}
            <MapView 
                style={styles.map}
                region={mapRegion}
                initialRegion={mapRegion}
            >
                {showLocationsOfInterest()}

            </MapView>

            {/* ------ SEARCH BAR ------ */}
            <SearchBar 
                imageSource={require('../assets/search.png')}
                style={styles.searchBar}
                onPress={() => console.log("Pressed search bar")}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    },
    friendsButton: {
        position: 'absolute',
        bottom: '5%',
        left: '15%',
    },
    chatButton: {
        position: 'absolute',
        bottom: '5%',
        left: '70%',
    }

});