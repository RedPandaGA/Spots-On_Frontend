// this is a temp file for milan lol
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const MainMapWithModals = () => {

  const [isFriendsListVisible, setFriendsListVisible] = useState(false);
  const [isColonyChatListVisible, setColonyChatListVisible] = useState(false);

  const toggleFriendsList = () => {
    setFriendsListVisible(!isFriendsListVisible);
  };

  const toggleColonyChatList = () => {
    setColonyChatListVisible(!isColonyChatListVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Left Modal" onPress={toggleFriendsList} style={styles.button} />
      <Button title="Open Right Modal" onPress={toggleColonyChatList} style={styles.button} />

      {/* Friends List (left modal)*/}
      <Modal
        isVisible={isFriendsListVisible}
        style={[styles.modal, styles.FriendsList]}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <View style={styles.modalContent}>
          <Text>Left Modal Content</Text>
          <TouchableOpacity onPress={toggleFriendsList}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Colony Chat List (right modal) */}
      <Modal
        isVisible={isColonyChatListVisible}
        style={[styles.modal, styles.ColonyChatList]}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <View style={styles.modalContent}>
          <Text>Right Modal Content</Text>
          <TouchableOpacity onPress={toggleColonyChatList}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 50, // Vertical margin of 50
  },
  modal: {
    backgroundColor: 'white',
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  FriendsList: {
    width: '90%', // Adjust as needed
  },
  ColonyChatList: {
    width: '90%', // Adjust as needed
    alignSelf: 'flex-end'
  },
});

export default MainMapWithModals;
