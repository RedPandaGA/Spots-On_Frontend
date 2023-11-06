import React from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, Animated, PanResponder, FlatList } from 'react-native';
import ColonySlider from "../components/colonySlider";
import SearchBar from "../components/searchBar";
import * as Animatable from 'react-native-animatable';

const FriendsModal = ({ isModalVisible, hideModal }) => {
    const screenWidth = Dimensions.get('window').width;
    const percentageThreshold = 0.5; // Adjust the percentage as needed

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

    // Define an array of friends and their statuses
    const friendsData = [
        { friendName: 'Friend 1', status: 'Status 1' },
        { friendName: 'Friend 2', status: 'Status 2' },
        { friendName: 'Friend 3', status: 'Status 3' },
        // Add more friends and statuses as needed
    ];

    return (
        <Modal transparent visible={isModalVisible} onRequestClose={hideModal} animationIn="slideInLeft" animationOut="slideOutLeft">
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
                <Animated.View
                    style={[
                        styles.modalContent,
                        { transform: [{ translateX: modalPosition }],
                        }
                    ]}
                >
                </Animated.View>
                <Animatable.View
                    animation="slideInLeft"
                    easing="ease-out"
                    duration={500}
                    style={styles.modalContainer}
                >
                </Animatable.View>
                {/* Colony Buttons Slider */}
                {/* ------ SEARCH BAR ------ */}
                <SearchBar
                    imageSource={require('../assets/search.png')}
                    style={styles.searchBar}
                    onPress={() => console.log("Pressed search bar")}
                />
                <ColonySlider style={styles.colonySlider} />

                {/* Display the list of friends and statuses using FlatList */}
                <FlatList
                    data={friendsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <Text style={styles.friendName}>{item.friendName}</Text>
                            <Text style={styles.friendStatus}>{item.status}</Text>
                        </View>
                    )}
                />
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
        width: '90%',
    },
    modalContent: {
        backgroundColor: '#43AA8B',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    friendItem: {
        borderBottomWidth: 1,
        borderColor: '#CCC',
        padding: 10,
    },
    friendName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C6765',
    },
    friendStatus: {
        fontSize: 16,
        color: '#2C6765',
    },
});

export default FriendsModal;
