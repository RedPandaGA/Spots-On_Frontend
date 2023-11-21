import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import SearchBarModal from "./searchBarModal";
import Modal from "react-native-modal";
import COLORS from "./colors";

const ChatModal = ({ isModalVisible, hideModal, navigation }) => {
  // Define an array of friends and their statuses
  const chatList = [
    {
      name: "Bestiesss",
      memberCount: 3,
    },
    {
      name: "Volleyball squad",
      memberCount: 4,
    },
    {
      name: "OOD group",
      memberCount: 5,
    },
    {
      name: "CSC 3102",
      memberCount: 20,
    },
    {
      name: "SASE people",
      memberCount: 28,
    },
  ];

  const [isColoniesPressed, setIsColoniesPressed] = useState(true);
  const [isFriendsPressed, setIsFriendsPressed] = useState(false);

  const [isClickingChat, setIsClickingChat] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setIsClickingChat(true);
        hideModal();
        navigation.navigate("ColonyChat");
      }}
    >
      <View style={styles.chatItem}>
        <View styles={styles.infoContainer}>
          <Image
            style={styles.chatImage}
            source={require("../assets/groupprofile.png")}
          />
          <Text style={styles.chatName}>{item.name}</Text>
        </View>
        <Text style={styles.memberCount}>{item.memberCount} members</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationIn="slideInRight"
      animationOut={isClickingChat ? "slideOutLeft" : "slideOutRight"}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsClickingChat(false);
        hideModal();
      }}
      onSwipeComplete={() => {
        setIsClickingChat(false);
        hideModal();
      }}
      swipeDirection="right"
      propagateSwipe
      style={{ margin: 0 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* ------ SEARCH BAR ------ */}
          <SearchBarModal
            imageSource={require("../assets/search.png")}
            style={styles.searchBar}
            onPress={() => console.log("Pressed search bar")}
          />

          {/* the choices */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                isColoniesPressed ? styles.buttonPressed : styles.buttonNormal
              }
              onPress={() => {
                setIsColoniesPressed(true);
                setIsFriendsPressed(false);
                console.log("Pressed Colonies");
              }}
            >
              <Text style={styles.buttonText}>Colonies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isFriendsPressed ? styles.buttonPressed : styles.buttonNormal
              }
              onPress={() => {
                setIsColoniesPressed(false);
                setIsFriendsPressed(true);
                console.log("Pressed Friends");
              }}
            >
              <Text style={styles.buttonText}>Friends</Text>
            </TouchableOpacity>
          </View>

          {/* Display the list of friends and statuses using FlatList */}
          <View style={{ marginTop: "3%", flex: 1, width: "100%" }}>
            <FlatList
              data={chatList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              noBorder
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
  },
  searchBar: {
    alignSelf: "center",
    marginTop: 43,
  },
  infoContainer: {
    flexDirection: "row",
    display: "flex",
    alignContent: "space-around",
  },
  chatItem: {
    margin: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    left: 80,
  },
  memberCount: {
    fontSize: 16,
    color: COLORS.status,
    left: 80,
  },
  chatImage: {
    height: 40,
    width: 40,
    left: 20,
    position: "absolute",
    tintColor: COLORS.secondary,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonNormal: {
    borderRadius: 30,
    width: 140,
    borderWidth: 2,
    borderColor: COLORS.lighterprimary,
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonPressed: {
    borderRadius: 30,
    width: 140,
    borderWidth: 1.5,
    borderColor: COLORS.lighterprimary,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: COLORS.lighterprimary,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
});

export default ChatModal;
