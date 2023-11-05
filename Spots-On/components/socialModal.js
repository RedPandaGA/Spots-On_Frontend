import React from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Bar from './bar';

const SocialModal = ({ isModalVisible, hideModal, setViewEvents }) => {
    const screenHeight = Dimensions.get('window').height;
    const percentageThreshold = 0.5; // Adjust the percentage as needed

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            // Calculate the threshold based on a percentage of the screen height
            const threshold = screenHeight * percentageThreshold;
            return e.nativeEvent.pageY > threshold && e.nativeEvent.pageY < screenHeight * (percentageThreshold + .1);
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

    const buttonList = ['Set Status', 'View Events', 'Create Event', 'Join Colony', 'Create Colony'];

      // Create an array of functions to handle button actions
    const buttonActions = [
        () => {
            console.log('Set Status clicked');
        },
        () => {
            hideModal();
            setViewEvents(true);
            console.log('View Events clicked');
            // Handle specific action for Button 2
            // You can customize this function for each button
        },
        () => {
            console.log('Create Event clicked');
            // Handle specific action for Button 3
        },
        () => {
            console.log('Join Colony clicked');
            // Handle specific action for Button 4
        },
        () => {
            console.log('Create Colony clicked');
            // Handle specific action for Button 5
        },
    ];

    const renderButton = (text, index) => {
        return (
          <TouchableOpacity style={styles.modalButton} onPress={buttonActions[index]} key={text}>
            <Text style={styles.buttonText}>{text}</Text>
          </TouchableOpacity>
        );
      };
    

    return (
        <Modal animationType="slide" transparent visible={isModalVisible} onRequestClose={hideModal}>
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
                <Animated.View
                style={[
                    styles.modalContent,
                    { transform: [{ translateY: modalPosition }] },
                ]}
                >
                    <Bar color={'#2C6765'}/>
                    {buttonList.map((buttonText, index) => renderButton(buttonText, index))}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    modalContent: {
        backgroundColor: '#E7EFCA',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C6765',
    },
    modalButton: {
        padding: 10,
        width: 350,
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#2C6765',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export default SocialModal;
