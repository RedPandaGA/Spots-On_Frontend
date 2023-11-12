import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import Modal from 'react-native-modal';
import ColonySliderModal from "../components/colonySliderModal";
import SearchBarModal from "../components/searchBarModal";
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

const FriendsModal = ({ isModalVisible, hideModal }) => {
    const screenWidth = Dimensions.get('window').width;
    const percentageThreshold = 0.2;

    // const panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: (e, gestureState) => true,
    //     onPanResponderMove: (event, gestureState) => {
    //         if (gestureState.dx < -screenWidth * percentageThreshold) {
    //             // Close the modal when swiped to the left
    //             hideModal();
    //         }
    //     },
    // });

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
        {
            name: 'Aeryn Shadingdong',
            status: 'volunteering at the hospital',
        },
        {
            name: 'Sacaen winds',
            status: 'working on OOD 2',
        },
        {
            name: 'bawmba',
            status: 'watching utube',
        },
        {
            name: 'anviii',
            status: 'chilling in PFT commons',
        },
        {
            name: 'sycosyclopse',
            status: 'studyingggg',
        },
        {
            name: 'austin',
            status: 'volunteering at the hospital',
        },
        {
            name: 'kelli dinh',
            status: 'working on OOD 2',
        },
        {
            name: 'Fred juley',
            status: 'watching utube',
        },
        {
            name: 'betsi cao',
            status: 'chilling in PFT commons',
        },
        {
            name: 'Rot Nguyen',
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
        <Modal 
            animationIn="slideInLeft" 
            animationOut="slideOutRight" 
            isVisible={isModalVisible}
            // onRequestClose={hideModal}
            deviceWidth={1}
            onSwipeComplete={hideModal}
            swipeThreshold={125}
            swipeDirection="left"
            propagateSwipe
        >
            <View style={styles.modalContainer} >
                {/* <Animatable.View
                    // animation={isModalVisible ? "slideInLeft" : "slideOutLeft"}
                    // duration={200}
                    style={[
                        styles.modalContent,
                        { transform: [{ translateX: modalPosition }],
                        }
                    ]}
                > */}
                <View style={styles.modalContent}>
                    {/* ------ SEARCH BAR ------ */}
                    <SearchBarModal
                        imageSource={require('../assets/search.png')}
                        style={styles.searchBar}
                        onPress={() => console.log("Pressed search bar")}
                    />

                    {/* Colony Buttons Slider */}
                    <ColonySliderModal style={styles.colonySlider} />

                    {/* Small Button */}
                    <TouchableOpacity style={styles.plusButton}>
                            <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>

                    {/* Display the list of friends and statuses using FlatList */}
                    <View style={{flex: 1, marginTop: '50%', width: '100%', height: '50%'}}>
                        <FlatList
                                style={{flex: 1}}
                                data={friendsList}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={true}
                        />         
                    </View>
                </View>

                    
                {/* </Animatable.View> */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        // position: 'absolute',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        width: '90%',
        height: '100%',
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
        width: '82%'
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
    friendItem: {
        // borderBottomWidth: 1,
        // borderColor: '#CCC',
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
    plusButton: {
        backgroundColor: '#E7EFCA',
        padding: 10,
        width: 45,
        height: 45,
        borderRadius: 50,
        position: 'absolute',
        top: '12.5%', // Adjust this to position the button as desired
        right: '3%', // Adjust this to position the button as desired
    },
    plusText: {
        fontSize: 40, // Adjust the font size as needed
        color: '#2C6765',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: -15,
    },
});

export default FriendsModal;
