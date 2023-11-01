import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapButton from "../components/mapButton";
import SearchBar from "../components/searchBar";
import ColonySlider from "../components/colonySlider";

export default function MainMap({ navigation }) {
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

    const [incognito, setIncognito] = useState(false);
    const [status, setStatus] = useState(false);

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

    const handleIncognito = () => {
        console.log("Pressed incognito button");
        if(incognito) {
            setIncognito(false);
        } else {
            setIncognito(true);
        }
    }

    const handleStatus = () => {
        console.log("Pressed status button");
        if(status) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            //console.log('dismissed keyboard');
        }}>
            <View>
                {/* Main Map */}
                <MapView 
                    style={styles.map}
                    region={mapRegion}
                    initialRegion={mapRegion}
                >
                    {showLocationsOfInterest()}
                    <Marker 
                        draggable
                        pinColor={'#0000ff'}
                        coordinate={draggableMarkerCoord}
                        onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                        description="This is a draggable marker"
                        title='draggable marker'
                    />
                </MapView>

                {/* ------ MAIN NAV BUTTONS ------ */}
                {/* Friends Button */}
                <MapButton
                    imageSource={require('../assets/people.png')} 
                    style={styles.friendsButton} 
                    onPress={() => console.log("Pressed friends button")}
                    width={60}
                    height={60}
                />
                {/* Social Button */}
                <TouchableOpacity onPress={() => console.log("Pressed social button")} style={styles.socialButtonOnMap}>
                    <View style={styles.socialButton}>
                        <Image 
                            source={require('../assets/ladybugfixed.png')}
                            style={styles.socialImage}
                        />
                    </View>
                </TouchableOpacity>
                {/* Chats Button */}
                <MapButton 
                    imageSource={require('../assets/speech-bubble.png')} 
                    style={styles.chatButton} 
                    onPress={() => console.log("Pressed chats button")}
                    width={60}
                    height={60}
                />

                {/* ------ SEARCH BAR ------ */}
                <SearchBar 
                    imageSource={require('../assets/search.png')}
                    style={styles.searchBar}
                    onPress={() => console.log("Pressed search bar")}
                />

                {/* Colony Buttons Slider */}
                <ColonySlider style={styles.colonySlider} />

                {/* ------ SIDE BUTTONS ------ */}
                {/* Incognito Buttons */}
                <MapButton 
                    imageSource={require('../assets/incognito.png')} 
                    style={styles.incognitoButton} 
                    onPress={() => handleIncognito()}
                    width={45}
                    height={45}
                    active={incognito}
                />
                {/* Status Button */}
                <MapButton 
                    imageSource={require('../assets/sensor.png')} 
                    style={styles.statusButton} 
                    onPress={() => handleStatus()}
                    width={45}
                    height={45}
                    active={status}
                />
                {/* Change Map View Button */}
                <MapButton 
                    imageSource={require('../assets/layers.png')} 
                    style={styles.mapViewButton} 
                    onPress={() => console.log("Pressed map view button")}
                    width={45}
                    height={45}
                />
                {/* Settings Button */}
                <MapButton 
                    imageSource={require('../assets/setting.png')} 
                    style={styles.settingsButton} 
                    onPress={() => {
                        console.log("Pressed settings button");
                        navigation.navigate('Settings');
                    }}
                    width={45}
                    height={45}
                />
            </View>
        </TouchableWithoutFeedback>
        
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
    },
    searchBar: {
        position: 'absolute',
        top: '5%',
        left: '5%',
    },
    colonySlider: {
        position: 'absolute',
        top: '12%',
        left: '4%',
    },
    incognitoButton: {
        position: 'absolute',
        bottom: '45%',
        left: '85%',
    },
    statusButton: {
        position: 'absolute',
        bottom: '55%',
        left: '85%',
    },
    mapViewButton: {
        position: 'absolute',
        bottom: '65%',
        left: '85%',
    },
    settingsButton: {
        position: 'absolute',
        top: '5%',
        left: '85%',
    },
    socialImage: {
        height: 60,
        width: 60,
        left: 2,
    },
    socialButtonOnMap: {
        position: 'absolute',
        bottom: '5%',
        left: '40%',
        elevation: 22,
        shadowColor: '#000',
        borderRadius: 50,
    },
    socialButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(44, 103, 101, .8)'
    },

});