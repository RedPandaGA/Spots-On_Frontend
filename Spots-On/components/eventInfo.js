import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import COLORS from "./colors";
import Modal from "react-native-modal";
import Bar from "./bar";
import MapView from "react-native-maps";
import Spot from "./spot";

const EventInfo = ({ isModalVisible, hideModal, showModal, event }) => {
  const circleCenter = {
    latitude: event.coordinate.latitude,
    longitude: event.coordinate.longitude,
  };
  const circleRadius = 150;

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const openAppleMaps = (latitude, longitude) => {
    const url = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    Linking.openURL(url);
  };

  const openWaze = (latitude, longitude) => {
    const url = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    Linking.openURL(url);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const eventDateString = (event) => {
    // const date = event.date.getDate();
    // const month = months[event.date.getMonth()];
    // const year = event.date.getFullYear();
    // const day = daysOfWeek[event.date.getDay()];
    return event.dateTime;
    // return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={() => {
        hideModal();
        setTimeout(() => {
          showModal("viewEvents");
        }, 500);
      }}
      onSwipeComplete={() => {
        hideModal();
        setTimeout(() => {
          showModal("viewEvents");
        }, 500);
      }}
      swipeThreshold={200}
      swipeDirection="down"
      propagateSwipe
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <Bar style={styles.bar} color={COLORS.primary} />
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.infoContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.eventTitle}>{event.name}</Text>
            </View>
            <ScrollView style={{ width: "100%", marginTop: 30 }}>
              <TouchableWithoutFeedback>
                <View style={styles.eventInfo}>
                  {/* <Text style={styles.eventText}>{event.colonyName}</Text> */}
                  <View style={styles.eventItemContainer}>
                    <Image
                      source={require("../assets/calendar.png")}
                      style={{
                        tintColor: COLORS.primary,
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text style={styles.eventText}>
                      {`${eventDateString(event)}`}
                    </Text>
                  </View>
                  <View style={styles.eventItemContainer}>
                    <Image
                      source={require("../assets/marker.png")}
                      style={styles.image}
                    />
                    <Text style={styles.eventText}>{`${event.address}`}</Text>
                  </View>
                  <Text
                    style={[styles.eventText]}
                  >{`${event.description}`}</Text>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>

            <MapView
              style={styles.map}
              region={event.coordinate}
              userInterfaceStyle="light"
            >
              <Spot
                coordinate={circleCenter}
                spotName={event.name}
                colonyName={event.colonyName}
                isSafe={true}
                spotRadius={circleRadius}
              />
            </MapView>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => {
                if (Platform.OS === "ios") {
                  openAppleMaps(circleCenter.latitude, circleCenter.longitude);
                } else if (Platform.OS === "android") {
                  openGoogleMaps(circleCenter.latitude, circleCenter.longitude);
                }
                console.log("Get Directions");
              }}
            >
              <Text style={styles.directionButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "95%",
    width: "100%",
  },
  eventTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    padding: 10,
    paddingBottom: 0,
    marginTop: 30,
  },
  eventColony: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  eventText: {
    fontSize: 20,
    color: COLORS.primary,
    marginVertical: 10,
    borderRadius: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    // paddingHorizontal: 20,
    fontWeight: "bold",
    // textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  directionButton: {
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    width: "50%",
    borderRadius: 50,
    marginBottom: 25,
  },
  directionButtonText: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  bar: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
    marginBottom: 0,
  },
  map: {
    height: "35%",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    marginVertical: 20,
  },
  eventItemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.darkersecondary,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    tintColor: COLORS.primary,
    height: 20,
    width: 20,
  },
});

export default EventInfo;
