import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Animated, PanResponder, StyleSheet, TouchableOpacity } from 'react-native';

const HorizontalDraggableModal = ({ isModalVisible, hideModal }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    // Reset the modal position when the modal visibility changes
    if (!isModalVisible) {
      Animated.spring(modalPosition, { toValue: 0, useNativeDriver: false }).start();
    }
  }, [isModalVisible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
        modalPosition.setValue(gestureState.dx);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx > 200 || gestureState.dx < -200) {
        // setIsDragging(false);
        // if (gestureState.dx > 100) {
          // Close the modal when swiped to the right (adjust threshold as needed)
          hideModal();
        } else {
          // Animate back to the initial position
          Animated.spring(modalPosition, { toValue: 0, useNativeDriver: false }).start();
        }
      },
  });

  const onModalShow = () => {
    setIsDragging(true);
  };

  return (
    <Modal transparent visible={isModalVisible} onShow={onModalShow}>
      <View style={styles.modalContainer} {...panResponder.panHandlers}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateX: modalPosition }] }]}>
          <Text style={styles.modalText}>Horizontally Draggable Modal</Text>
          <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HorizontalDraggableModal;
