import React, { useState } from 'react';
import { Modal, Dimensions, StyleSheet, View, Text, Image, Animated, PanResponder, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import Bar from './bar';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventModal = ({ isModalVisible, hideModal, setSocialModal }) => {

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState('Date');
    const [timeText, setTimeText] = useState('Time');
    
    const [event, setEvent] = useState({
        colonyName: '',
        eventDate: new Date(),
        eventTime: '',
        eventLocation: '',
        eventDescription: '',
    });

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || eventDate;
        setEvent({ ...event, ['eventDate']: selectedDate});
        setShow(false);
        let tempDate = new Date(currentDate);
        let hours = tempDate.getHours();
        let minutes = tempDate.getMinutes() > 0 ? tempDate.getMinutes() : '00';
        if (hours == 0 || hours == 12) {
            hours = 12;
        } else if (hours > 12) {
            hours -= 12;
        }
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = hours + ':' + minutes;
        if (tempDate.getHours() >= 12) {
            fTime += ' pm';
        } else {
            fTime += ' am';
        }
        
        setDateText(fDate);
        setTimeText(fTime);
        setEvent({ ...event, ['eventTime']: fTime});

        console.log(fDate + ' (' + fTime + ")");

    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const screenHeight = Dimensions.get('window').height;
    const percentageThreshold = 0.3; // Adjust the percentage as needed

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            // Calculate the threshold based on a percentage of the screen height
            // const threshold = screenHeight * percentageThreshold;
            // return e.nativeEvent.pageY > threshold && e.nativeEvent.pageY < screenHeight * (percentageThreshold + .1);
            return true;
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

    const handleInputChange = (key, value) => {
        setEvent({ ...event, [key]: value });
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
                        <Text style={styles.modalTitle}>Create Event</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.buttonNormal}
                            onPress={() => {
                                showMode('date');
                                console.log("Pressed Date");
                            }}
                        >
                            <Text style={styles.buttonText}>{dateText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonNormal}
                            onPress={() => {
                                showMode('time');
                                console.log("Pressed Time");
                            }}
                            >
                            <Text style={styles.buttonText}>{timeText}</Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker 
                                testId='dateTimePicker'
                                value={event.eventDate}
                                mode={mode}
                                is24Hour={false}
                                display='spinner'
                                onChange={onChange}

                            />
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Colony Name"
                            placeholderTextColor={'#2C6765'}
                            value={event.colonyName}
                            onChangeText={(text) => handleInputChange('colonyName', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            placeholderTextColor={'#2C6765'}
                            value={event.eventLocation}
                            onChangeText={(text) => handleInputChange('eventLocation', text)}
                        />
                        <TextInput
                            style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
                            placeholder="Description"
                            placeholderTextColor={'#2C6765'}
                            multiline
                            numberOfLines={4}
                            value={event.eventDescription}
                            onChangeText={(text) => handleInputChange('eventDescription', text)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonNormal}
                            onPress={() => {
                                hideModal();
                                setSocialModal(true);
                                console.log('Event Canceled');
                            }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonNormal}
                            onPress={() => {
                                // Save the event object or perform other actions here
                                hideModal();
                                console.log('Event Created', event);
                            }}
                        >
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
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
        height: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C6765',
        textAlign: 'center',
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
        marginVertical: 10,
        alignItems: 'center',
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
        left: -70,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        color: '#2C6765',
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default CreateEventModal;
