import React from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import ColonySlider from "../components/colonySlider";
import SearchBar from "../components/searchBar";
import * as Animatable from 'react-native-animatable';

const FriendsModal = ({ isModalVisible, hideModal }) => {
    const screenWidth = Dimensions.get('window').width;
    const percentageThreshold = .5; // Adjust the percentage as needed

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
        // Calculate the threshold based on a percentage of the screen width
        const threshold = screenWidth * percentageThreshold;
        return e.nativeEvent.pageX > threshold;
        },
        onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx > 0) {
            if (gestureState.dx < screenWidth * percentageThreshold) {
            modalPosition.setValue(gestureState.dx);
            }
        }
        },
        onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 200) {
            hideModal();
        } else {
            modalPosition.setValue(0);
        }
        },
    });

    const modalPosition = new Animated.Value(0);

    return (
        <Modal transparent visible={isModalVisible} onRequestClose={hideModal} animationIn="slideInLeft" animationOut="slideOutLeft" >
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
                <Animated.View
                style={[
                    styles.modalContent,
                    { transform: [{ translateX: modalPosition }] },
                ]}
                >  
                </Animated.View>
                <Animatable.View
        animation="slideInLeft" // Specify the animation type
        easing="ease-out"
        duration={500} // Optional: Set the duration of the animation
        style={styles.modalContainer}
      ></Animatable.View>
                {/* Colony Buttons Slider */}
                                    {/* ------ SEARCH BAR ------ */}
                                    <SearchBar 
                        imageSource={require('../assets/search.png')}
                        style={styles.searchBar}
                        onPress={() => console.log("Pressed search bar")}
                />
                <ColonySlider style={styles.colonySlider} />
            </View>
        </Modal>
    );
    };

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        width: '90%'
    },
    modalContent: {
        backgroundColor: '#43AA8B',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        height: Dimensions.get('window').height,
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
    colonySlider: {
        position: 'absolute',
        top: '12%',
        left: '4%',
    },
    searchBar: {
        position: 'absolute',
        top: '5%',
        left: '5%',
    }
});

export default FriendsModal;
