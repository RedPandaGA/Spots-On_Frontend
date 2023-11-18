import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import Bar from "./bar";
import COLORS from "./colors";
import Modal from "react-native-modal";

const ColonyChatList = ({ isModalVisible, hideModal, navigation }) => {

  const chatList = [
    {
      name: 'Bestiesss',
      memberCount: 3,
    },
    {
      name: 'Volleyball squad',
      memberCount: 4,
    },
    {
      name: 'OOD group',
      memberCount: 5,
    },
    {
      name: 'CSC 3102',
      memberCount: 20,
    },
    {
      name: 'SASE people',
      memberCount: 28,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ColonyChat')}>
      <View style={styles.chatItem}>
        <View>
          <Image
            style={styles.chatImage}
            source={require('../assets/marker.png')}
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
      backdropOpacity={0}
      swipeDirection="up"
      transparent
      visible={isModalVisible}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: modalPosition }] },
          ]}
        >
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
    borderRadius: 50,
    padding: 20,
    height: 225,
    width: "103%",
    alignSelf: "center",
    alignItems: "center",
  },
  listContainer: {
    width: '100%',
    marginVertical: -10,
  },
  bar: {
    alignItems: 'center'
  },
  chatItem: {
    paddingVertical: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    left: 100,
  },
  memberCount: {
    fontSize: 16,
    color: COLORS.status,
    left: 100,
  },
  chatImage: {
    height: 40,
    width: 40,
    left: 30,
    position: 'absolute',
    tintColor: COLORS.primary
  },
});

export default ColonyChatList;