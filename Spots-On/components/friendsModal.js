import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { LayoutAnimation, UIManager } from "react-native";
import ColonySliderModal from "../components/colonySliderModal";
import SearchBarModal from "../components/searchBarModal";
import COLORS from "./colors";
import { AntDesign } from "@expo/vector-icons";

const FriendsModal = ({ isModalVisible, 
    hideModal, 
    navigation, 
    users, 
    colonies,
    setColonies, 
    getSpots,
    spots,
    setSpots,
    setUsers,
    getUsersInColony,
    findSelectedColony}) => {
    if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [addingFriend, setAddingFriend] = useState(false);

  const expandButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddingFriend(true);
  };

  const collapseButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddingFriend(false);
  };

  // Define an array of friends and their statuses
  //   const friendsList = [
  //     {
  //       name: "Michelle Vo",
  //       status: "volunteering at the hospital",
  //     },
  //     {
  //       name: "Faris Khattak",
  //       status: "working on OOD 2",
  //     },
  //     {
  //       name: "Gavin Avery",
  //       status: "watching utube",
  //     },
  //     {
  //       name: "Richard Jiang",
  //       status: "chilling in PFT commons",
  //     },
  //     {
  //       name: "Milan Nguyen",
  //       status: "studyingggg",
  //     },
  //     {
  //       name: "Aeryn Shadingdong",
  //       status: "volunteering at the hospital",
  //     },
  //     {
  //       name: "Sacaen winds",
  //       status: "working on OOD 2",
  //     },
  //     {
  //       name: "bawmba",
  //       status: "watching utube",
  //     },
  //     {
  //       name: "anviii",
  //       status: "chilling in PFT commons",
  //     },
  //     {
  //       name: "sycosyclopse",
  //       status: "studyingggg",
  //     },
  //     {
  //       name: "austin",
  //       status: "volunteering at the hospital",
  //     },
  //     {
  //       name: "kelli dinh",
  //       status: "working on OOD 2",
  //     },
  //     {
  //       name: "Fred juley",
  //       status: "watching utube",
  //     },
  //     {
  //       name: "betsi cao",
  //       status: "chilling in PFT commons",
  //     },
  //     {
  //       name: "Rot Nguyen",
  //       status: "studyingggg",
  //     },
  //   ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        hideModal();
        navigation.navigate("FriendChat");
      }}
    >
      <View style={styles.friendItem}>
        <View styles={styles.infoContainer}>
          <Image
            style={styles.friendImage}
            source={require("../assets/profile.png")}
          />
          <Text style={styles.friendName}>{item.nickname}</Text>
        </View>
        <Text style={styles.friendStatus}>{item.status}Online</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isVisible={isModalVisible}
      onSwipeComplete={hideModal}
      onBackdropPress={hideModal}
      swipeDirection="left"
      propagateSwipe
      style={{ margin: 0 }}
      backdropOpacity={0.4}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* ------ SEARCH BAR ------ */}
          <SearchBarModal
            imageSource={require("../assets/search.png")}
            style={styles.searchBar}
            onPress={() => console.log("Pressed search bar")}
          />

          <View style={styles.sliderContainer}>
            {/* Colony Buttons Slider */}
            <ColonySliderModal 
                colonies={colonies}
                setColonies={setColonies}
                getSpots={getSpots}
                spots={spots}
                setSpots={setSpots}
                setUsers={setUsers}
                getUsersInColony={getUsersInColony}
                findSelectedColony={findSelectedColony}
            />

            {/* Add Friends Button */}
            {/* <TouchableOpacity style={styles.plusButton}>
                                <Text style={styles.plusText}>+</Text>
                        </TouchableOpacity> */}
          </View>

          {/* Display the list of friends and statuses using FlatList */}
          <View style={{ flex: 1, marginTop: 20, marginRight: 20 }}>
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
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
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
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
  },
  searchBar: {
    alignSelf: "center",
    marginTop: 43,
  },
  sliderContainer: {
    marginTop: 13,
    width: "100%",
    marginLeft: 20,
  },
  plusButton: {
    backgroundColor: COLORS.primary,
    marginRight: 10,
    padding: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 5,
  },
  plusText: {
    fontSize: 40, // Adjust the font size as needed
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: -16,
  },
  infoContainer: {
    flexDirection: "row",
    display: "flex",
    alignContent: "space-around",
  },
  friendItem: {
    margin: 10,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    left: 80,
  },
  friendStatus: {
    fontSize: 16,
    color: COLORS.status,
    left: 80,
  },
  friendImage: {
    height: 40,
    width: 40,
    left: 20,
    position: "absolute",
    tintColor: COLORS.secondary,
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
  },
});

export default FriendsModal;
