import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const MainMapWithModals = () => {
  const [isLeftModalVisible, setLeftModalVisible] = useState(false);
  const [isRightModalVisible, setRightModalVisible] = useState(false);

  const toggleLeftModal = () => {
    setLeftModalVisible(!isLeftModalVisible);
  };

  const toggleRightModal = () => {
    setRightModalVisible(!isRightModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Left Modal" onPress={toggleLeftModal} style={styles.button} />
      <Button title="Open Right Modal" onPress={toggleRightModal} style={styles.button} />

      {/* Left Modal */}
      <Modal
        isVisible={isLeftModalVisible}
        style={[styles.modal, styles.leftModal]}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <View style={styles.modalContent}>
          <Text>Left Modal Content</Text>
          <TouchableOpacity onPress={toggleLeftModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Right Modal */}
      <Modal
        isVisible={isRightModalVisible}
        style={[styles.modal, styles.rightModal]}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <View style={styles.modalContent}>
          <Text>Right Modal Content</Text>
          <TouchableOpacity onPress={toggleRightModal}>
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
  leftModal: {
    width: '90%', // Adjust as needed
  },
  rightModal: {
    width: '90%', // Adjust as needed
    alignSelf: 'flex-end'
  },
});

export default MainMapWithModals;
