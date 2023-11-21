import React, { useState } from "react";
import {
  Modal,
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

const ViewEventsModal = ({
  isModalVisible,
  hideModal,
  showModal,
  eventsToday,
  eventsUpcoming,
}) => {
  const [isTodayPressed, setIsTodayPressed] = useState(true);
  const [isUpcomingPressed, setIsUpcomingPressed] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const percentageThreshold = 0.6; // Adjust the percentage as needed

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      // Calculate the threshold based on a percentage of the screen height
      const threshold = screenHeight * percentageThreshold;
      return e.nativeEvent.pageY < threshold;
    },
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        if (gestureState.dy < screenHeight * percentageThreshold) {
          modalPosition.setValue(gestureState.dy);
        }
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > 200) {
        hideModal();
      } else {
        modalPosition.setValue(0);
      }
    },
  });

  const modalPosition = new Animated.Value(0);

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
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
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.modalContainer} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: modalPosition }] },
          ]}
        >
          <Bar color={COLORS.primary} />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                hideModal();
                showModal("social");
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
              style={
                isTodayPressed ? styles.buttonPressed : styles.buttonNormal
              }
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
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    height: "60%",
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
  },
});

export default ViewEventsModal;
