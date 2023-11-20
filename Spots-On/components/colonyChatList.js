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

const ColonyChatList = ({ isModalVisible, hideModal, navigation }) => {
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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ColonyChat")}>
      <View style={styles.chatItem}>
        <View>
          <Image
            style={styles.chatImage}
            source={require("../assets/marker.png")}
          />
          <Text style={styles.chatName}>{item.name}</Text>
        </View>
        <Text style={styles.memberCount}>{item.memberCount} members</Text>
      </View>
    </TouchableOpacity>
  );

  const modalPosition = -490;

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
            data={chatList}
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
    height: 225,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    marginBottom: 10,
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
    tintColor: COLORS.primary,
  },
});

export default ColonyChatList;
