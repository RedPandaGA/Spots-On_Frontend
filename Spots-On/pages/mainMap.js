import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  Text,
  StatusBar,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapButton from "../components/mapButton";
import SearchBar from "../components/searchBar";
import ColonySlider from "../components/colonySlider";
import SocialModal from "../components/socialModal";
import FriendsModal from "../components/friendsModal";
import ViewEventsModal from "../components/viewEventsModal";
import CreateEventModal from "../components/createEventModal";
import CreateColonyModal from "../components/createColonyModal";
import CreateSpotModal from "../components/spotsModal";
import ChatModal from "../components/chatModal";
import COLORS from "../components/colors";
import Spot from "../components/spot";
import Splash from "./splash";

export default function MainMap({ navigation }) {
  // Manage the location of the map
  //   const [mapRegion, setMapRegion] = useState({
  //     latitude: 30.4133,
  //     longitude: -91.18,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setInitialRegion(initialRegion);
      setCurrentRegion(initialRegion);
    };

    getLocation();
  }, []);

  const showCurrentLocation = () => {
    return (
      <Marker
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        // title="User name"
        // description="status description"
      >
        <Image
          source={require("../assets/profilePicture.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            borderWidth: 2,
            borderColor:
              showStatus || incognito ? COLORS.active : COLORS.primary,
          }}
        />
        <Callout>
          <View style={{ minWidth: 150 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              User name
            </Text>
            {!showStatus && (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: COLORS.status,
                }}
              >
                status description
              </Text>
            )}
            {showStatus && (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: COLORS.active,
                }}
              >
                Unavailable
              </Text>
            )}
          </View>
        </Callout>
      </Marker>
    );
  };

  const mapRef = useRef(null);

  const handleRegionChange = (region) => {
    const threshold = 0.009;
    // console.log(region);
    // console.log("Calling region change function");
    if (
      Math.abs(currentRegion.latitude - region.latitude) > threshold ||
      Math.abs(currentRegion.longitude - region.longitude) > threshold ||
      Math.abs(currentRegion.latitudeDelta - region.latitudeDelta) >
        threshold ||
      Math.abs(currentRegion.longitudeDelta - region.longitudeDelta) > threshold
    ) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  };

  const handleResetMap = () => {
    setShowResetButton(false);
    setCurrentRegion(initialRegion);

    if (mapRef.current) {
      mapRef.current.animateToRegion(initialRegion, 750);
    }
  };

  // Track map type changes
  const [mapType, setMapType] = useState("standard");

  const handleMapType = () => {
    if (mapType == "standard") {
      setMapType("satellite");
    } else {
      setMapType("standard");
    }
  };

  // Track incognito and status choices
  const [incognito, setIncognito] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleIncognito = () => {
    console.log("Pressed incognito button");
    if (incognito) {
      setIncognito(false);
    } else {
      setIncognito(true);
    }
  };

  const handleShowStatus = () => {
    console.log("Pressed show status button");
    if (showStatus) {
      setShowStatus(false);
    } else {
      setShowStatus(true);
    }
  };

  // Create a state variable to control the visibility of all modals
  const [modals, setModals] = useState({
    social: false,
    friends: false,
    viewEvents: false,
    createEvent: false,
    createColony: false,
    spots: false,
    chat: false,
  });

  // Function to show a specific modal
  const showModal = (modalKey) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: true,
    }));
  };

  // Function to hide a specific modal
  const hideModal = (modalKey) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: false,
    }));
  };

  const [spots, setSpots] = useState([]);
  const [createSpot, setCreateSpot] = useState(false);

  const handleCreateSpot = () => {
    console.log("Pressed create spot button");
    setCreateSpot(true);
  };

  const cancelCreateSpot = () => {
    setCreateSpot(false);
  };

  const [newSpot, setNewSpot] = useState({
    name: "",
    colonyName: "",
    radius: 250,
    coordinate: {},
    safe: true,
  });

  const resetNewSpot = () => {
    setNewSpot({
      name: "",
      colonyName: "",
      radius: 250,
      coordinate: {},
      safe: true,
    });
  };

  const addSpot = (event) => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (createSpot) {
      currentSpot = newSpot;
      const updatedSpot = {
        ...currentSpot,
        id: Date.now(),
        coordinate: event.nativeEvent.coordinate,
      };

      setSpots([...spots, updatedSpot]);
      resetNewSpot();
      setCreateSpot(false);
      console.log("Added spot: ", updatedSpot);
    }
  };

  const handleSpotDrag = (event, spotId) => {
    const updatedSpots = spots.map((spot) => {
      if (spot.id === spotId) {
        return {
          ...spot,
          coordinate: event.nativeEvent.coordinate,
        };
      }
      return spot;
    });
    setSpots(updatedSpots);
  };

  const handleSpotDragEnd = (event, spotId) => {
    const updatedSpots = spots.map((spot) => {
      if (spot.id === spotId) {
        console.log("New coords for", spot);
        return {
          ...spot,
          coordinate: event.nativeEvent.coordinate,
        };
      }
      return spot;
    });
    setSpots(updatedSpots);
  };

  const displayAllSpots = () => {
    return spots.map((spot) => (
      <Spot
        key={spot.id}
        coordinate={spot.coordinate}
        spotName={spot.name}
        colonyName={spot.colonyName}
        spotRadius={spot.radius}
        isSafe={spot.safe}
        onDrag={(e) => handleSpotDrag(e, spot.id)}
        onDragEnd={(e) => handleSpotDragEnd(e, spot.id)}
      />
    ));
  };

  // let locationsOfInterest = [
  //     {
  //         title: "First",
  //         location: {
  //             latitude: 30.4077,
  //             longitude: -91.17989,
  //         },
  //         description: "Patrick F Taylor Hall"
  //     },
  //     {
  //         title: "Second",
  //         location: {
  //             latitude: 30.412035,
  //             longitude: -91.183815,
  //         },
  //         description: "Tiger Stadium"
  //     }
  // ];

  // const showLocationsOfInterest = () => {
  //     return locationsOfInterest.map((item, index) => {
  //         return (
  //             <Marker
  //                 key={index}
  //                 coordinate={item.location}
  //                 title={item.title}
  //                 description={item.description}
  //                 style={{height: 100}}
  //             />
  //         )
  //     });
  // };

  // const panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => isSocialModalVisible,
  //     onPanResponderMove: (event, gestureState) => {
  //         if (gestureState.dy > 0) {
  //             if (gestureState.dy < 150) {
  //             modalPosition.setValue(gestureState.dy);
  //             }
  //         }
  //     },
  //     onPanResponderRelease: (event, gestureState) => {
  //         if (gestureState.dy > 50) {
  //             hideSocialModal();
  //         } else {
  //             modalPosition.setValue(0);
  //         }
  //     },
  // });

  // const modalPosition = new Animated.Value(0);

  if (initialRegion === null || currentRegion == null) {
    return <Splash />;
  }

  return (
    // <KeyboardAvoidingView behavior="height" enabled={false}>
    <View>
      {initialRegion && currentRegion && (
        <View>
          <StatusBar />
          {/* Main Map */}
          <MapView
            style={styles.map}
            //   initialRegion={defaultRegion}
            ref={mapRef}
            initialRegion={initialRegion}
            region={currentRegion}
            //   onRegionChange={(newRegion) => setMapRegion(newRegion)}
            onRegionChange={handleRegionChange}
            mapType={mapType}
            onPress={addSpot}
          >
            {/* {showLocationsOfInterest()}
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
                              /> */}
            {displayAllSpots()}
            {currentLocation && showCurrentLocation()}
            <Circle
              center={{
                latitude: 30.41699914895536,
                longitude: -91.17555990815163,
              }}
              radius={1000}
              strokeWidth={1}
              strokeColor="#2C6765"
              fillColor="rgba(44, 103, 101, .3)"
            />
            <Circle
              center={{
                latitude: 30.39950609050538,
                longitude: -91.18346974253654,
              }}
              radius={400}
              strokeWidth={1}
              strokeColor="#2C6765"
              fillColor="rgba(44, 103, 101, .3)"
            />
            <Circle
              center={{
                latitude: 30.39446465572983,
                longitude: -91.17913294583559,
              }}
              radius={200}
              strokeWidth={1}
              strokeColor="#rgba(255, 85, 85, 1)"
              fillColor="rgba(255, 85, 85, .3)"
            />
          </MapView>

          {/* ------ MAIN NAV BUTTONS ------ */}
          {/* Friends Button */}
          <MapButton
            imageSource={require("../assets/people.png")}
            style={styles.friendsButton}
            onPress={() => {
              showModal("friends");
              console.log("Pressed friends button");
            }}
            width={60}
            height={60}
          />
          <FriendsModal
            isModalVisible={modals.friends}
            hideModal={() => hideModal("friends")}
          />

          {/* Social Button */}
          <TouchableOpacity
            onPress={() => {
              showModal("social");
              console.log("Pressed social button");
            }}
            style={styles.socialButtonOnMap}
          >
            <View style={styles.socialButton}>
              <Image
                source={require("../assets/ladybugfixed.png")}
                style={styles.socialImage}
              />
            </View>
          </TouchableOpacity>
          {modals.social && (
            <SocialModal
              isModalVisible={modals.social}
              hideModal={() => hideModal("social")}
              showModal={showModal}
            />
          )}
          {modals.viewEvents && (
            <ViewEventsModal
              isModalVisible={modals.viewEvents}
              hideModal={() => hideModal("viewEvents")}
              showModal={showModal}
            />
          )}
          {modals.createEvent && (
            <CreateEventModal
              isModalVisible={modals.createEvent}
              hideModal={() => hideModal("createEvent")}
              showModal={showModal}
            />
          )}
          {modals.createColony && (
            <CreateColonyModal
              isModalVisible={modals.createColony}
              hideModal={() => hideModal("createColony")}
              showModal={showModal}
            />
          )}
          {/* Chats Button */}
          <MapButton
            imageSource={require("../assets/speech-bubble.png")}
            style={styles.chatButton}
            onPress={() => {
              showModal("chat");
              console.log("Pressed chat button");
            }}
            width={60}
            height={60}
          />
          <ChatModal
            isModalVisible={modals.chat}
            hideModal={() => hideModal("chat")}
            navigation={navigation} 
          />

          {/* ------ SEARCH BAR ------ */}
          <SearchBar
            imageSource={require("../assets/search.png")}
            style={styles.searchBar}
            onPress={() => console.log("Pressed search bar")}
          />

          {/* Colony Buttons Slider */}
          <ColonySlider style={styles.colonySlider} />

          {/* ------ SIDE BUTTONS ------ */}
          {showResetButton && (
            <MapButton
              imageSource={require("../assets/target.png")}
              style={styles.targetButton}
              onPress={handleResetMap}
              width={45}
              height={45}
            />
          )}

          {/* Incognito Buttons */}
          <MapButton
            imageSource={require("../assets/incognito.png")}
            style={styles.incognitoButton}
            onPress={handleIncognito}
            width={45}
            height={45}
            active={incognito}
          />
          {/* Status Button */}
          <MapButton
            imageSource={require("../assets/sensor.png")}
            style={styles.statusButton}
            onPress={handleShowStatus}
            width={45}
            height={45}
            active={showStatus}
          />
          {/* Change Map View Button */}
          <MapButton
            imageSource={require("../assets/layers.png")}
            style={styles.mapViewButton}
            onPress={() => {
              handleMapType();
              console.log("Pressed map view button");
            }}
            width={45}
            height={45}
          />
          {/* Spots Modal Button */}
          <MapButton
            imageSource={require("../assets/spots.png")}
            style={styles.spotsButton}
            active={createSpot}
            onPress={() => {
              showModal("spots");
              handleCreateSpot();
            }}
            width={45}
            height={45}
          />
          {modals.spots && (
            <CreateSpotModal
              isModalVisible={modals.spot}
              hideModal={() => hideModal("spots")}
              cancelCreateSpot={cancelCreateSpot}
              newSpot={newSpot}
              setNewSpot={setNewSpot}
              resetNewSpot={resetNewSpot}
            />
          )}
          {/* Settings Button */}
          <MapButton
            imageSource={require("../assets/setting.png")}
            style={styles.settingsButton}
            onPress={() => {
              console.log("Pressed settings button");
              navigation.navigate("Settings");
            }}
            width={45}
            height={45}
          />
        </View>
      )}
    </View>

    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  friendsButton: {
    position: "absolute",
    bottom: "5%",
    left: "15%",
  },
  chatButton: {
    position: "absolute",
    bottom: "5%",
    left: "70%",
  },
  searchBar: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  colonySlider: {
    position: "absolute",
    top: "12%",
  },
  spotsButton: {
    position: "absolute",
    bottom: "35%",
    left: "85%",
  },
  incognitoButton: {
    position: "absolute",
    bottom: "45%",
    left: "85%",
  },
  statusButton: {
    position: "absolute",
    bottom: "55%",
    left: "85%",
  },
  mapViewButton: {
    position: "absolute",
    bottom: "65%",
    left: "85%",
  },
  targetButton: {
    position: "absolute",
    bottom: "65%",
    left: "5%",
  },
  settingsButton: {
    position: "absolute",
    top: "5%",
    left: "85%",
  },
  socialImage: {
    height: 60,
    width: 60,
    left: 2,
  },
  socialButtonOnMap: {
    position: "absolute",
    bottom: "5%",
    left: "40%",
    elevation: 2,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    borderRadius: 50,
  },
  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 75,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "rgba(44, 103, 101, 1)",
  },
  markerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  callout: {
    minWidth: 150,
    minHeight: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calloutTextContainer: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
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
