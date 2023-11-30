import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SearchBarModal from "./searchBarModal";
import Modal from "react-native-modal";
import COLORS from "./colors";
import Config from "../.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { LayoutAnimation, UIManager } from "react-native";

const papiUrl = Config.PAPI_URL;

const ChatModal = ({
  isModalVisible,
  hideModal,
  navigation,
  colonies,
  user,
}) => {
  const [isColoniesPressed, setIsColoniesPressed] = useState(true);
  const [isFriendsPressed, setIsFriendsPressed] = useState(false);

  const [addingFriend, setAddingFriend] = useState(false);

  const expandButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddingFriend(true);
  };

  const collapseButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddingFriend(false);
  };

  const [isClickingChat, setIsClickingChat] = useState(false);

  const images = [
    require("../assets/sase.jpg"),
    require("../assets/csc3102.jpg"),
    require("../assets/milan.jpg"),
    require("../assets/richard.jpg"),
  ];

  const coloniesWithImages = colonies.map((colony, index) => ({
    ...colony,
    image: images[index] || require("../assets/groupprofile.png"),
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setIsClickingChat(true);
        hideModal();
        navigation.navigate("ColonyChat", {
          item: item,
          colonies: colonies,
          user: user,
        });
      }}
    >
      <View style={styles.chatItem}>
        <View styles={styles.infoContainer}>
          <Image style={styles.chatImage} source={item.image} />
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
      backdropOpacity={0.4}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* ------ SEARCH BAR ------ */}
          <SearchBarModal
            imageSource={require("../assets/search.png")}
            style={
              Platform.OS == "android"
                ? styles.searchBarAndroid
                : styles.searchBarIOS
            }
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
            {isColoniesPressed && !isFriendsPressed && (
              <FlatList
                data={coloniesWithImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                noBorder
              />
            )}
            {!isColoniesPressed && isFriendsPressed && (
              <View>
                {addingFriend ? (
                  <View>
                    <TextInput
                      placeholder="Enter friend's phone #"
                      placeholderTextColor={COLORS.secondary}
                      onSubmitEditing={(event) => {
                        const friendName = event.nativeEvent.text;
                        console.log("New friend added:", friendName);
                        collapseButton();
                      }}
                      style={styles.expandedInput}
                      keyboardType="numeric"
                    />
                    <AntDesign
                      style={styles.addFriendImageInput}
                      name="pluscircle"
                      size={40}
                      color={COLORS.secondary}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={expandButton}
                  >
                    <AntDesign
                      style={styles.addFriendImage}
                      name="pluscircle"
                      size={40}
                      color={COLORS.secondary}
                    />
                    <Text style={styles.addFriendText}>Add a new friend</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
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
  searchBarAndroid: {
    alignSelf: "center",
    marginTop: 45,
  },
  searchBarIOS: {
    alignSelf: "center",
    marginTop: 59,
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
    borderRadius: 50,
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
    marginHorizontal: 10,
  },
  buttonPressed: {
    borderRadius: 30,
    width: 140,
    borderWidth: 1.5,
    borderColor: COLORS.lighterprimary,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: COLORS.lighterprimary,
    marginHorizontal: 10,
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
  addFriendButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
  },
  addFriendImage: {
    marginRight: 20,
  },
  addFriendImageInput: {
    marginLeft: 30,
    marginTop: 12.25,
    position: "absolute",
  },
  addFriendText: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  expandedInput: {
    marginLeft: 30,
    marginRight: -10,
    marginTop: 12.25,
    backgroundColor: COLORS.darkerprimary,
    paddingVertical: 6.25,
    paddingLeft: 60,
    marginBottom: 12,
    borderRadius: 30,
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: "bold",
    width: "84%",
  },
});

export default ChatModal;
