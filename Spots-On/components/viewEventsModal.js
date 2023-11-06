import React, { useState } from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, Image, Animated, PanResponder, TouchableOpacity, FlatList } from 'react-native';
import Bar from './bar';

const ViewEventsModal = ({ isModalVisible, hideModal, setSocialModal }) => {

    const [isTodayPressed, setIsTodayPressed] = useState(true);
    const [isUpcomingPressed, setIsUpcomingPressed] = useState(false);

    const screenHeight = Dimensions.get('window').height;
    const percentageThreshold = 0.6; // Adjust the percentage as needed

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
        // Calculate the threshold based on a percentage of the screen height
            const threshold = screenHeight * percentageThreshold;
            return e.nativeEvent.pageY < threshold;
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

    // Today's events
    const eventsToday = [
        {
            title: 'VSA 2nd General Body Meeting',
            location: 'Himes Hall Room 216',
            time: '6:00pm',
        },
        {
            title: 'OOD meeting',
            location: 'Teatery on College',
            time: '12:00pm',
        },
        {
            title: 'Team Building Workshop',
            location: 'Conference Room A',
            time: '3:30pm',
        },
        {
            title: 'Tech Conference Keynote',
            location: 'Convention Center Hall B',
            time: '9:00am',
        },
        {
            title: 'Art Exhibition Opening',
            location: 'City Art Gallery',
            time: '7:30pm',
        },
        
    ];

    // Upcoming events
    const eventsUpcoming = [
        {
            title: 'Music Festival',
            location: 'City Park',
            time: '2:00pm',
        },
        {
            title: 'Book Launch Party',
            location: 'Local Bookstore',
            time: '7:00pm',
        },
        {
            title: 'Food Truck Rally',
            location: 'Downtown Square',
            time: '5:30pm',
        },
        {
            title: 'Movie Night Under the Stars',
            location: 'Community Park',
            time: '8:00pm',
        },
        {
            title: 'Charity Run',
            location: 'Riverfront Trail',
            time: '9:00am',
        },
    ];
    
    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <View styles={styles.infoContainer}>
                <Image
                    style={styles.eventImage}
                    source={require('../assets/marker.png')}
                />
                <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
            <Text style={styles.eventLocation}>{item.location} @ {item.time}</Text>
        </View>
    );
      

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
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            hideModal();
                            setSocialModal(true);
                            console.log("Pressed back button to social");
                        }}>
                            <Image 
                                source={require('../assets/back-button-primary-color.png')}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Events</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={isTodayPressed ? styles.buttonPressed : styles.buttonNormal}
                            onPress={() => {
                                setIsTodayPressed(true);
                                setIsUpcomingPressed(false);
                                console.log("Pressed Today");
                            }}
                        >
                            <Text style={styles.buttonText}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={isUpcomingPressed ? styles.buttonPressed : styles.buttonNormal}
                            onPress={() => {
                                setIsTodayPressed(false);
                                setIsUpcomingPressed(true);
                                console.log("Pressed Upcoming");
                            }}
                            >
                            <Text style={styles.buttonText}>Upcoming</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, width: '100%'}}>
                        {isTodayPressed && 
                            <FlatList
                                data={eventsToday}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                        {isUpcomingPressed && 
                            <FlatList
                                data={eventsUpcoming}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                    </View>
                    
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
        height: '60%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C6765',
        textAlign: 'center',
        letterSpacing: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonNormal: {
        borderRadius: 30,
        width: 170,
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonPressed: {
        borderRadius: 30,
        width: 170,
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(44, 103, 101, .2)'
    },
    buttonText: {
        fontSize: 20,
        color: '#2C6765',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        display: 'flex',
        alignContent: 'space-around',
    },
    backButton: {
        height: 55,
        width: 55,
        position: 'absolute',
        left: -100,
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignContent: 'space-around'
    },
    eventItem: {
        margin: 5,
        padding: 10,
        marginLeft: 50
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C6765',
    },
    eventLocation: {
        fontSize: 16,
        color: '#2C6765',
    },
    eventImage: {
        height: 40,
        width: 40,
        position: 'absolute',
        left: -50,
    },
});

export default ViewEventsModal;
