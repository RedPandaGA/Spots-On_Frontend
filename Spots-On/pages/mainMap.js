import React, { useState } from "react";
import { StyleSheet, Animated, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Modal, PanResponder } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import MapButton from "../components/mapButton";
import SearchBar from "../components/searchBar";
import ColonySlider from "../components/colonySlider";
import SocialModal from "../components/socialModal";
import FriendsModal from "../components/friendsModal";
import ChatModal from "../components/chatModal";
import ViewEventsModal from "../components/viewEventsModal";
import CreateEventModal from "../components/createEventModal";
import CreateColonyModal from "../components/createColonyModal";
import { StatusBar } from 'react-native';


export default function MainMap({ navigation }) {

    // Manage the location of the map
    const [mapRegion, setMapRegion] = useState({
        latitude: 30.4133,
        longitude: -91.1800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Manage the location of the draggable Marker
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 30.41,
        longitude: -91.18,
    });

    // Track incognito and status choices
    const [incognito, setIncognito] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    // Track social button modal
    const [isSocialModalVisible, setIsSocialModalVisible] = useState(false);

    // Track friends button modal
    const [isFriendsModalVisible, setIsFriendsModalVisible] = useState(false);

    // Track chat button modal
    const [isChatModalVisible, setIsChatModalVisible] = useState(false);

    // Track view events modal
    const [isViewEventsModalVisible, setIsViewEventsModalVisible] = useState(false);

    // Track create event modal
    const [isCreateEventModalVisible, setIsCreateEventModalVisible] = useState(false);

    // Track create colony modal
    const [isCreateColonyModalVisible, setIsCreateColonyModalVisible] = useState(false);

    // Track map type changes
    const [mapType, setMapType] = useState('standard');

    const handleIncognito = () => {
        console.log("Pressed incognito button");
        if(incognito) {
            setIncognito(false);
        } else {
            setIncognito(true);
        }
    }

    const handleShowStatus = () => {
        console.log("Pressed show status button");
        if(showStatus) {
            setShowStatus(false);
        } else {
            setShowStatus(true);
        }
    }

    const showSocialModal = () => {
        setIsSocialModalVisible(true);
    };

    const hideSocialModal = () => {
        setIsSocialModalVisible(false);
    };

    const showFriendsModal = () => {
        setIsFriendsModalVisible(true);
    };

    const hideFriendsModal = () => {
        setIsFriendsModalVisible(false);
    };

    const showChatModal = () => {
        setIsChatModalVisible(true);
    };

    const hideChatModal = () => {
        setIsChatModalVisible(false);
    };
    // const showViewEventsModal = () => {
    //     setIsViewEventsModalVisible(true);
    // };

    const hideViewEventsModal = () => {
        setIsViewEventsModalVisible(false);
    };

    // const showCreateEventModal = () => {
    //     setIsCreateEventModalVisible(true);
    // }

    const hideCreateEventModal = () => {
        setIsCreateEventModalVisible(false);
    }

    const hideCreateColonyModal = () => {
        setIsCreateColonyModalVisible(false);
    }

    const handleMapType = () => {
        if(mapType == 'standard') {
            setMapType('satellite');
        } else {
            setMapType('standard');
        }
    };


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
                    style={{height: 100}}
                />
            )
        });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => isSocialModalVisible,
        onPanResponderMove: (event, gestureState) => {
          if (gestureState.dy > 0) {
            if (gestureState.dy < 150) {
              modalPosition.setValue(gestureState.dy);
            }
          }
        },
        onPanResponderRelease: (event, gestureState) => {
          if (gestureState.dy > 50) {
            hideSocialModal();
          } else {
            modalPosition.setValue(0);
          }
        },
      });

      const modalPosition = new Animated.Value(0);


    return(
        <KeyboardAvoidingView
            behavior="height"
            enabled={false}
        >
            <TouchableWithoutFeedback touchSoundDisabled onPress={() => {
                Keyboard.dismiss();
                //console.log('dismissed keyboard');
            }}>
                <View>
                    <StatusBar/>
                    {/* Main Map */}
                    <MapView 
                        style={styles.map}
                        // region={mapRegion}
                        initialRegion={mapRegion}
                        onRegionChange={newRegion => setMapRegion(newRegion)}
                        mapType={mapType}
                    >
                        {showLocationsOfInterest()}
                        <Marker 
                            draggable
                            pinColor={'#0000ff'}
                            coordinate={draggableMarkerCoord}
                            onDragEnd={(e) => {
                                setDraggableMarkerCoord(e.nativeEvent.coordinate);
                                console.log("New coordinates for marker:");
                                console.log(e.nativeEvent.coordinate)
                            }}
                            description="This is a draggable marker"
                            title='draggable marker'
                        />
                        <Circle 
                            center={{"latitude": 30.41699914895536, "longitude": -91.17555990815163}} 
                            radius={1000} 
                            strokeWidth={1} 
                            strokeColor="#2C6765"
                            fillColor='rgba(44, 103, 101, .3)'
                        />
                        <Circle 
                            center={{"latitude": 30.39950609050538, "longitude": -91.18346974253654}}
                            radius={400} 
                            strokeWidth={1} 
                            strokeColor="#2C6765"
                            fillColor='rgba(44, 103, 101, .3)'
                        />
                        <Circle 
                            center={{"latitude": 30.39446465572983, "longitude": -91.17913294583559}}
                            radius={200} 
                            strokeWidth={1} 
                            strokeColor="#rgba(255, 85, 85, 1)"
                            fillColor='rgba(255, 85, 85, .3)'
                        />
                    </MapView>

                    {/* ------ MAIN NAV BUTTONS ------ */}
                    {/* Friends Button */}
                    <MapButton 
                        imageSource={require('../assets/people.png')}
                        style={styles.friendsButton}
                        onPress={() => {
                            showFriendsModal();
                            console.log("Pressed friends button");
                        }}
                        width={60}
                        height={60}
                    />
                    <FriendsModal
                        isModalVisible={isFriendsModalVisible}
                        hideModal={hideFriendsModal}
                    />                    
                    {/* Social Button */}
                    <TouchableOpacity onPress={() => {
                        showSocialModal();
                        console.log("Pressed social button");
                    }} style={styles.socialButtonOnMap}>
                        <View style={styles.socialButton}>
                            <Image 
                                source={require('../assets/ladybugfixed.png')}
                                style={styles.socialImage}
                            />
                        </View>
                    </TouchableOpacity>
                    {isSocialModalVisible && 
                        <SocialModal 
                            isModalVisible={isSocialModalVisible} 
                            hideModal={hideSocialModal} 
                            setViewEvents={setIsViewEventsModalVisible} 
                            setCreateEvent={setIsCreateEventModalVisible}
                            setCreateColony={setIsCreateColonyModalVisible}
                        />
                    }
                    {isViewEventsModalVisible && 
                        <ViewEventsModal 
                            isModalVisible={isViewEventsModalVisible} 
                            hideModal={hideViewEventsModal} 
                            setSocialModal={setIsSocialModalVisible}
                        />
                    }
                    {isCreateEventModalVisible && 
                        <CreateEventModal 
                            isModalVisible={isCreateEventModalVisible} 
                            hideModal={hideCreateEventModal} 
                            setSocialModal={setIsSocialModalVisible}
                        />
                    }
                    {isCreateColonyModalVisible && 
                        <CreateColonyModal 
                            isModalVisible={isCreateColonyModalVisible} 
                            hideModal={hideCreateColonyModal} 
                            setSocialModal={setIsSocialModalVisible}
                        />
                    }

                    {/* Chats Button */}
                    <MapButton 
                        imageSource={require('../assets/speech-bubble.png')}
                        style={styles.chatButton}
                        onPress={() => {
                            showChatModal();
                            console.log("Pressed chat button");
                        }}
                        width={60}
                        height={60}
                    />
                    <ChatModal
                        isModalVisible={isChatModalVisible}
                        hideModal={hideChatModal}
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
                        onPress={() => handleShowStatus()}
                        width={45}
                        height={45}
                        active={showStatus}
                    />
                    {/* Change Map View Button */}
                    <MapButton 
                        imageSource={require('../assets/layers.png')} 
                        style={styles.mapViewButton} 
                        onPress={() => {
                            handleMapType();
                            console.log("Pressed map view button");
                        }}
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
        </KeyboardAvoidingView>
        
        
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
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
    markerImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
    }
});