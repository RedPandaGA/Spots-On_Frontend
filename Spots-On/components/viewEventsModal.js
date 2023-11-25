import React, { useState, useEffect } from "react";
import {
  // Modal,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const ViewEventsModal = ({
  isModalVisible,
  hideModal,
  showModal,
  eventsToday,
  eventsUpcoming,
  currentEvent,
  setCurrentEvent,
}) => {
  const [isTodayPressed, setIsTodayPressed] = useState(true);
  const [isUpcomingPressed, setIsUpcomingPressed] = useState(false);

  // useEffect with currentEvent as a dependency
  useEffect(() => {
    // This code block will run whenever currentEvent changes
    console.log("Current event has been updated:", currentEvent);

    // Add any other logic or actions you want to perform after state update
  }, [currentEvent]); // Specify currentEvent as a dependency

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <TouchableOpacity
        onPress={() => {
          setCurrentEvent(item);
          hideModal();
          setTimeout(() => {
            showModal("eventInfo");
          }, 500);
          // showModal("eventInfo");
          console.log("Current event:", currentEvent);
        }}
      >
        <View styles={styles.infoContainer}>
          <Image
            style={styles.eventImage}
            source={require("../assets/marker.png")}
          />
          <Text style={styles.eventTitle}>{item.name}</Text>
        </View>
        <Text style={styles.eventLocation}>
          {item.address} @ {item.time}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection="down"
      propagateSwipe
      style={styles.modalContainer}
      backdropOpacity={0}
    >
      <View style={[styles.modalContent, styles.shadow]}>
        <Bar color={COLORS.primary} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              hideModal();
              setTimeout(() => {
                showModal("social");
              }, 500);
              // showModal("social");
              console.log("Pressed back button to social");
            }}
          >
            <Image
              source={require("../assets/backButton.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Events</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={isTodayPressed ? styles.buttonPressed : styles.buttonNormal}
            onPress={() => {
              setIsTodayPressed(true);
              setIsUpcomingPressed(false);
              console.log("Pressed Today");
            }}
          >
            <Text style={styles.buttonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isUpcomingPressed ? styles.buttonPressed : styles.buttonNormal
            }
            onPress={() => {
              setIsTodayPressed(false);
              setIsUpcomingPressed(true);
              console.log("Pressed Upcoming");
            }}
          >
            <Text style={styles.buttonText}>Upcoming</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          {isTodayPressed && (
            <FlatList
              data={eventsToday}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // showsVerticalScrollIndicator={false}
            />
          )}
          {isUpcomingPressed && (
            <FlatList
              data={eventsUpcoming}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // showsVerticalScrollIndicator={false}
            />
          )}
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    height: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonNormal: {
    borderRadius: 30,
    width: 160,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPressed: {
    borderRadius: 30,
    width: 160,
    borderWidth: 2,
    borderColor: COLORS.darkersecondary,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: COLORS.darkersecondary,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    display: "flex",
    alignContent: "space-around",
  },
  backButton: {
    height: 50,
    width: 50,
    position: "absolute",
    left: -100,
    tintColor: COLORS.primary,
  },
  infoContainer: {
    flexDirection: "row",
    display: "flex",
    alignContent: "space-around",
  },
  eventItem: {
    margin: 5,
    padding: 10,
    marginLeft: 50,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  eventLocation: {
    fontSize: 16,
    color: COLORS.primary,
  },
  eventImage: {
    height: 40,
    width: 40,
    position: "absolute",
    left: -50,
    tintColor: COLORS.red,
  },
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default ViewEventsModal;
