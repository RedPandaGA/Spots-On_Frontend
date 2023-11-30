import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const ColonyChatList = ({
  isModalVisible,
  hideModal,
  navigation,
  colonies,
}) => {
  //   const chatList = [
  //     {
  //       name: "Bestiesss",
  //       memberCount: 3,
  //     },
  //     {
  //       name: "Volleyball squad",
  //       memberCount: 4,
  //     },
  //     {
  //       name: "OOD group",
  //       memberCount: 5,
  //     },
  //     {
  //       name: "CSC 3102",
  //       memberCount: 20,
  //     },
  //     {
  //       name: "SASE people",
  //       memberCount: 28,
  //     },
  //   ];

  const images = [
    require("../assets/sase.jpg"),
    require("../assets/csc3102.jpg"),
    require("../assets/ood group.jpg"),
  ];

  const coloniesWithImages = colonies.map((colony, index) => ({
    ...colony,
    image: images[index] || require("../assets/groupprofile.png"),
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ColonyChat", {
          item: item,
          colonies: colonies,
          user: item,
        })
      }
    >
      <View style={styles.chatItem}>
        <View>
          <Image style={styles.chatImage} source={item.image} />
          <Text style={styles.chatName}>{item.name}</Text>
        </View>
        <Text style={styles.memberCount}>{item.memberCount} members</Text>
      </View>
    </TouchableOpacity>
  );

  // const modalPosition = -490;

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutUp"
      onSwipeComplete={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0}
      swipeDirection="up"
      propagateSwipe
      isVisible={isModalVisible}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        {/* Display the list of friends and statuses using FlatList */}
        <View style={styles.listContainer}>
          <FlatList
            data={colonies}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            noBorder
          />
          <View style={styles.bar}>
            <Bar color={COLORS.primary} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingTop: 90,
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 0,
    height: 225,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    width: 250,
  },
  listContainer: {
    width: "100%",
    height: "110%",
  },
  bar: {
    alignItems: "center",
  },
  chatItem: {
    paddingVertical: 7,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    left: 90,
  },
  memberCount: {
    fontSize: 16,
    color: COLORS.status,
    left: 90,
  },
  chatImage: {
    height: 40,
    width: 40,
    left: 30,
    position: "absolute",
    tintColor: COLORS.primary,
  },
});

export default ColonyChatList;
