import React from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, Animated, PanResponder, FlatList, Image } from 'react-native';
import ColonySlider from "../components/colonySlider";
import SearchBar from "../components/searchBar";
import * as Animatable from 'react-native-animatable';

const FriendsModal = ({ isModalVisible, hideModal }) => {
    const screenWidth = Dimensions.get('window').width;
    const percentageThreshold = 0.4; // Adjust the percentage as needed

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
    const friendsList = [
        {
            name: 'Michelle Vo',
            status: 'volunteering at the hospital',
        },
        {
            name: 'Faris Khattak',
            status: 'working on OOD 2',
        },
        {
            name: 'Gavin Avery',
            status: 'watching utube',
        },
        {
            name: 'Richard Jiang',
            status: 'chilling in PFT commons',
        },
        {
            name: 'Milan Nguyen',
            status: 'studyingggg',
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.friendItem}>
            <View styles={styles.infoContainer}>
                <Image
                    style={styles.friendImage}
                    source={require('../assets/marker.png')}
                />
                <Text style={styles.friendName}>{item.name}</Text>
            </View>
            <Text style={styles.friendStatus}>{item.status}</Text>
        </View>
    );

    return (
        <Modal transparent visible={isModalVisible} onRequestClose={hideModal} animationIn="slideInLeft" animationOut="slideOutLeft">
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
                <Animatable.View
                    animation="slideInLeft"
                    easing="ease-out"
                    duration={500}
                    style={[
                        styles.modalContent,
                        { transform: [{ translateX: modalPosition }],
                        }
                    ]}
                >

                {/* ------ SEARCH BAR ------ */}
                <SearchBar
                    imageSource={require('../assets/search.png')}
                    style={styles.searchBar}
                    onPress={() => console.log("Pressed search bar")}
                />

                {/* Colony Buttons Slider */}
                <ColonySlider style={styles.colonySlider} />

                {/* Display the list of friends and statuses using FlatList */}
                <View style={{marginTop: '45%', flex: 1, width: '100%'}}>
                    <FlatList
                        data={friendsList}
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
        backgroundColor: '#E7EFCA',
        transparent: '0%'
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignContent: 'space-around'
    },
    friendItem: {
        borderBottomWidth: 1,
        borderColor: '#CCC',
        padding: 10,
    },
    friendName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E7EFCA',
        left: 80,
    },
    friendStatus: {
        fontSize: 16,
        color: '#D5B747',
        left: 80,
    },
    friendImage: {
        height: 40,
        width: 40,
        left: 20,
        position: 'absolute',
        tintColor: '#E7EFCA'
    },
});

export default FriendsModal;
