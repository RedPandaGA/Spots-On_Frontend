import React from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, Animated, PanResponder, FlatList, Image } from 'react-native';
import ColonySliderModal from "./colonySliderModal";
import SearchBarModal from "./searchBarModal";
import * as Animatable from 'react-native-animatable';

const ChatModal = ({ isModalVisible, hideModal }) => {
    const screenWidth = Dimensions.get('window').width;
    const percentageThreshold = 0.2;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            if (gestureState.dx < -screenWidth * percentageThreshold) {
                // Close the modal when swiped to the right
                hideModal();
            }
        },
    });

    const modalPosition = new Animated.Value(0);

    // Define an array of friends and their statuses
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
        <View style={styles.chatItem}>
            <View styles={styles.infoContainer}>
                <Image
                    style={styles.chatImage}
                    source={require('../assets/marker.png')}
                />
                <Text style={styles.chatName}>{item.name}</Text>
            </View>
            <Text style={styles.memberCount}>{item.memberCount}</Text>
        </View>
    );

    return (
        <Modal transparent visible={isModalVisible} onRequestClose={hideModal}>
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
                <Animatable.View
                // milan => need to make this slide out to the right
                    animation={isModalVisible ? "slideInRight" : "slideOutRight"}
                    duration={200}
                    style={[
                        styles.modalContent,
                        { transform: [{ translateX: modalPosition }],
                        }
                    ]}
                >

                {/* ------ SEARCH BAR ------ */}
                <SearchBarModal
                    imageSource={require('../assets/search.png')}
                    style={styles.searchBar}
                    onPress={() => console.log("Pressed search bar")}
                />

                {/* Colony Buttons Slider */}
                <ColonySliderModal style={styles.colonySlider} />

                {/* Display the list of friends and statuses using FlatList */}
                <View style={{marginTop: '50%', flex: 1, width: '100%'}}>
                    <FlatList
                        data={chatList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                </Animatable.View>
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
        height: '100%'
    },
    modalContent: {
        backgroundColor: '#2C6765',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        height: '100%',
        //height: Dimensions.get('window').height, // this explodes it
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
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignContent: 'space-around',
    },
    chatItem: {
        borderBottomWidth: 1,
        borderColor: '#CCC',
        padding: 10,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E7EFCA',
        left: 80,
    },
    memberCount: {
        fontSize: 16,
        color: '#D5B747',
        left: 80,
    },
    chatImage: {
        height: 40,
        width: 40,
        left: 20,
        position: 'absolute',
        tintColor: '#E7EFCA'
    },
});

export default ChatModal;