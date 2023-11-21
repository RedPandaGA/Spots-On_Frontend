import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
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
import { isPointWithinRadius } from "geolib";
import StatusModal from "../components/statusModal";
import Config from '../.config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import users from "../components/users";

const papiUrl = Config.PAPI_URL;

export default function MainMap({ navigation }) {
  // Manage the location of the map
  //   const [mapRegion, setMapRegion] = useState({
  //     latitude: 30.4133,
  //     longitude: -91.18,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });

  // const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [showResetButton, setShowResetButton] = useState(false);

  // CREATE FUNCTION TO GRAB USER INFORMATION AND STORE INTO USESTATE VARIABLES?
  const [user, setUser] = useState({
    nickname: "faris",
    uid: "1000",
    status: "", // custom description
    statusCode: 0, // 0 - online, 1 - idle, 2 - do not disturb
    incognito: false,
    userSettings: {}, // JSON of settings
    currentLocation: {},
    lastContact: "", // time
    picture: "../assets/profilePicture.png", // not sure how to store yet
    emergency: false,
    premium: false,
    associatedColonies: [
      "SASE",
      "lsu engineering",
      "swim friends",
      "ood group",
      "best friends",
      "volleyball",
      "oopah",
      "vsa",
    ],
  });

  const logUser = () => {
    console.log(user);
  };

  const updateUserLocation = async () => {
    try {
        // Get the authorization token from AsyncStorage
        const authToken = await AsyncStorage.getItem('token');
    
        if (!authToken) {
          // Handle the case where the token is not available
          console.error('Authorization token not found.');
          return;
        }
    
        const response = await fetch(`${papiUrl}/updateUserLocation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
          },
          body: JSON.stringify({ location: user.currentLocation }),
        });
    
        if (!response.ok) {
          // Handle error, e.g., display an error message
          console.error('Error updating user location:', response.status);
          return;
        }
    
        // Successfully updated user location
        console.log('User location updated successfully ' + JSON.stringify(response));
      } catch (error) {
        console.error('Error:', error);
        // Handle other errors as needed
      }
  };

  // GRAB LOCATION FROM USER AND STORE IN DATABASE
  useEffect(() => {
    const getLocation = async () => {
      console.log("Asking permission for location...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      console.log("Permission granted!");

      console.log("Getting current position...");
      // let location = await Location.getCurrentPositionAsync({});
      let location = await getCurrentLocation();
      // setCurrentLocation(location.coords);
      setUser({ ...user, currentLocation: location.coords });
      console.log("Received current position!");
      console.log(location.coords);

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
    updateUserLocation();

    // Update user's location every 30 seconds
    const locationInterval = setInterval(async () => {
      console.log("Updating user's location...");
      let location = await getCurrentLocation();
      setUser({ ...user, currentLocation: location.coords });
      console.log("Updated user's location!");
      updateUserLocation();
    }, 30000); // 30 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(locationInterval);
  }, []);

  // GRAB LOCATION FROM USER AND STORE IN DATABASE
  const getCurrentLocation = () => {
    const timeout = 10000;
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Error getting gps location after ${(timeout * 2) / 1000} s`
          )
        );
      }, timeout * 2);
      setTimeout(async () => {
        resolve(await Location.getLastKnownPositionAsync());
      }, timeout);
      resolve(await Location.getCurrentPositionAsync());
    });
  };

  const showCurrentLocation = () => {
    return (
      <Marker
        coordinate={{
          latitude: user.currentLocation.latitude,
          longitude: user.currentLocation.longitude,
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
            borderColor: getStatusColor(user),
          }}
        />
        <Callout>
          <View style={{ minWidth: 150 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              {user.nickname}
            </Text>
            {user.status === "" && (
              <Text
                style={[styles.statusLabel, { color: getStatusColor(user) }]}
              >
                {statusIdentifiers[user.statusCode].label}
              </Text>
            )}
            {user.status !== "" && (
              <Text
                style={[styles.statusLabel, { color: getStatusColor(user) }]}
              >
                {user.status}
              </Text>
            )}
          </View>
        </Callout>
      </Marker>
    );
  };

  const findSelectedColony = (colonies) => {
    return colonies.find((colony) => colony.selected);
  };

  const renderUsersOnMap = (users, colonies) => {
    // Find the selected colony
    const selectedColony = findSelectedColony(colonies);

    // If no colony is selected, return an empty array
    if (!selectedColony) {
      return [];
    }

    // Filter users based on the selected colony
    //Update to get a list of users from db
    const filteredUsers = users.filter((user) =>
      user.associatedColonies.includes(selectedColony.name)
    );

    return filteredUsers.map((user) => (
      <Marker
        key={user.uid}
        coordinate={{
          latitude: user.currentLocation.latitude,
          longitude: user.currentLocation.longitude,
        }}
      >
        <Image
          source={require("../assets/profile-user.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: COLORS.primary,
            tintColor: getStatusColor(user),
          }}
        />
        <Callout>
          <View style={{ minWidth: 150 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              {user.nickname}
            </Text>
            {user.status === "" && (
              <Text
                style={[styles.statusLabel, { color: getStatusColor(user) }]}
              >
                {statusIdentifiers[user.statusCode].label}
              </Text>
            )}
            {user.status !== "" && (
              <Text
                style={[styles.statusLabel, { color: getStatusColor(user) }]}
              >
                {user.status}
              </Text>
            )}
          </View>
        </Callout>
      </Marker>
    ));
  };

  const getStatusColor = (user) => {
    const { statusCode, incognito } = user;
    if (statusCode === 2 || incognito) return COLORS.active;
    if (statusCode === 1) return COLORS.status;
    return COLORS.green;
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

  const statusIdentifiers = [
    {
      label: "Online",
      value: "1",
    },
    {
      label: "Idle",
      value: "2",
    },
    {
      label: "Do not disturb",
      value: "3",
    },
  ];

  const handleIncognito = () => {
    console.log("Pressed incognito button");
    if (user.incognito) {
      setUser({ ...user, incognito: false });
    } else {
      setUser({ ...user, incognito: true });
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
    status: false,
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

  // GET ALL SPOTS FROM DATABASE BASED ON SELECTED COLONY
  const [spots, setSpots] = useState([]);

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

  // const displayAllSpots = () => {
  //   return spots.map((spot) => (
  //     <Spot
  //       key={spot.id}
  //       coordinate={spot.coordinate}
  //       spotName={spot.name}
  //       colonyName={spot.colonyName}
  //       spotRadius={spot.radius}
  //       isSafe={spot.safe}
  //       onDrag={(e) => handleSpotDrag(e, spot.id)}
  //       onDragEnd={(e) => handleSpotDragEnd(e, spot.id)}
  //     />
  //   ));
  // };

  const displayAllSpots = () => {
    return spots
      .filter((spot) => {
        // Find the associated colony
        const associatedColony = colonies.find(
          (colony) => colony.name === spot.colonyName
        );

        // Display the spot only if the associated colony is selected
        return associatedColony && associatedColony.selected;
      })
      .map((spot) => (
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

  // GET ALL COLONIES FROM DATABASE AND STORE INTO VARIABLES TO USE AND DISPLAY
  // USE THE SELECTED VALUE OR SOMETHING SIMILAR TO GRAB SPECIFIC MEMBERS/SPOTS BASED ON THE SELECTED COLONY
  const [colonies, setColonies] = useState([
    { name: "SASE", selected: true, value: 1 },
    { name: "lsu engineering", selected: false, value: 1 },
    { name: "swim friends", selected: false, value: 2 },
    { name: "ood group", selected: false, value: 3 },
    { name: "best friends", selected: false, value: 4 },
    { name: "volleyball", selected: false, value: 5 },
    { name: "oopah", selected: false, value: 6 },
    { name: "vsa", selected: false, value: 7 },
  ]);

  // CREATE FUNCTION TO GET ALL MEMBERS WITHIN A SELECTED COLONY AND DISPLAY THEM ON THE MAP

  if (initialRegion === null || currentRegion == null) {
    return <Splash />;
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled={false}>
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
              // onPress={addSpot}
              onPress={() => Keyboard.dismiss()}
            >
              {/* FUNCTION TO DISPLAY ALL MEMBERS WITHIN SELECTED COLONY */}
              {displayAllSpots()}
              {renderUsersOnMap(users, colonies)}
              {user.currentLocation && showCurrentLocation()}
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
              navigation={navigation}
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
                colonies={colonies}
                allSpots={spots}
              />
            )}
            {modals.createColony && (
              <CreateColonyModal
                isModalVisible={modals.createColony}
                hideModal={() => hideModal("createColony")}
                showModal={showModal}
                user={user}
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
            {/* PASS IN COLONIES/PEOPLE TO SEARCH FOR IN ORDER TO USE SEARCH FUNCTION */}
            <SearchBar
              imageSource={require("../assets/search.png")}
              style={styles.searchBar}
              onPress={() => console.log("Pressed search bar")}
            />

            {/* Colony Buttons Slider */}
            <ColonySlider
              style={styles.colonySlider}
              colonies={colonies}
              setColonies={setColonies}
              spots={spots}
              setSpots={setSpots}
            />

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
              active={user.incognito}
            />
            {/* Status Button */}
            <MapButton
              imageSource={require("../assets/sensor.png")}
              style={styles.statusButton}
              onPress={() => showModal("status")}
              width={45}
              height={45}
            />
            <StatusModal
              isModalVisible={modals.status}
              hideModal={() => hideModal("status")}
              user={user}
              setUser={setUser}
              statusIdentifiers={statusIdentifiers}
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
              onPress={() => {
                showModal("spots");
              }}
              width={45}
              height={45}
            />
            {modals.spots && (
              <CreateSpotModal
                isModalVisible={modals.spots}
                hideModal={() => hideModal("spots")}
                allSpots={spots}
                setAllSpots={setSpots}
                mapRegion={{
                  latitude: user.currentLocation.latitude,
                  longitude: user.currentLocation.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                colonies={colonies}
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
    </KeyboardAvoidingView>
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
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
