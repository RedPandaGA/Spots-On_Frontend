import React, { useState } from 'react';
import { Modal, Switch, StyleSheet, View, Text, Image, Animated, PanResponder, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
// import Bar from './bar';
// import DateTimePicker from '@react-native-community/datetimepicker';

const CreateSpotModal = ({ isModalVisible, hideModal, cancelCreateSpot, newSpot, setNewSpot, resetNewSpot }) => {
    

    const handleInputChange = (key, value) => {
        setNewSpot({ ...newSpot, [key]: value });
    };

    const toggleSafety = () => {
        setNewSpot((prevSpot) => ({
            ...prevSpot,
            safe: !prevSpot.safe,
        }));
    };

    return (
        <Modal animationType="fade" transparent visible={isModalVisible} onRequestClose={hideModal}>
            <KeyboardAvoidingView behavior='height' style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Create Spot</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Spot Name"
                            placeholderTextColor={'#E7EFCA'}
                            value={newSpot.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Colony Name"
                            placeholderTextColor={'#E7EFCA'}
                            value={newSpot.colonyName}
                            onChangeText={(text) => handleInputChange('colonyName', text)}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        {/* <Text style={styles.switchText}>{newSpot.safe ? 'Safe' : 'Unsafe'}</Text> */}
                        <Text style={styles.switchText}>Safe</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#E7EFCA'}}
                            thumbColor={newSpot.safe ? '#2C6765' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSafety}
                            value={newSpot.safe}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonNormal}
                            onPress={() => {
                                hideModal();
                                cancelCreateSpot();
                                resetNewSpot();
                                console.log('Canceled creating a spot');
                            }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonNormal}
                            onPress={() => {
                                // Save the event object or perform other actions here
                                hideModal();
                                // console.log('Spot Created:\n', new);
                            }}
                        >
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>

                    
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    modalContent: {
        backgroundColor: '#2C6765',
        borderRadius: 50,
        padding: 20,
        height: 340,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E7EFCA',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonNormal: {
        borderRadius: 30,
        width: '45%',
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#E7EFCA'
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
        color: '#E7EFCA',
        fontWeight: 'bold',
        fontSize: 16
    },
    switchContainer: {
        justifyContent: 'center',
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    switchText: {
        color: '#E7EFCA',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 20,
        alignSelf: 'center'
    }
});

export default CreateSpotModal;
