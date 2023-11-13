import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';

export default function Notifications({ navigation }) {

    const statusList = ["friend1", "friend2", "friend3"];

    const locationList = ["friend1l", "friend2l", "friend3lr"];

    const [statusSwitches, setStatusSwitches] = useState({
        friend1: false,
        friend2: false,
        friend3: false,
    });

    const [locationSwitches, setLocationSwitches] = useState({
        friend1location: false,
        friend2location: false,
        friend3location: false,
    });

    const handleStatusToggle = (name) => {
        setStatusSwitches((prevSwitches) => ({
            ...prevSwitches,
            [name]: !prevSwitches[name],
        }));
        console.log(`Toggle switch for ${name} clicked`);
    };

    const handleLocationToggle = (name) => {
        setLocationSwitches((prevSwitches) => ({
            ...prevSwitches,
            [name]: !prevSwitches[name],
        }));
        console.log(`Toggle switch for ${name} clicked`);
    };

    const spotsList = ["Edit your Spots notifications on the Main Map page"];

    const renderStatusToggleBox = (text, index) => {
        return (
            <View  key={`status_${index}`}>
                <Text style={styles.toggleText}>{text}</Text>
                <Switch
                    style={styles.toggleSwitch}
                    value={statusSwitches[text]}
                    onValueChange={() =>
                        handleStatusToggle(text)}
                    trackColor={{
                        false: '#305c5c', // color when switch is off
                        true: '#D5B747',  // color when switch is on
                    }}
                    thumbColor={statusSwitches[text] ? '#E7EFCA' : '#2C6765'}
                />
            </View>
        );
    };

    const renderLocationToggleBox = (text, index) => {
        return (
            <View  key={`location_${index}`}>
                <Text style={styles.toggleText}>{text}</Text>
                <Switch
                    style={styles.toggleSwitch}
                    value={locationSwitches[text]}
                    onValueChange={() =>
                        handleLocationToggle(text)}
                    trackColor={{
                        false: '#305c5c', // color when switch is off
                        true: '#D5B747',  // color when switch is on
                    }}
                    thumbColor={locationSwitches[text] ? '#E7EFCA' : '#2C6765'}
                />
            </View>
        );
    };

    const renderSpotsToggleBox = (text, index) => {
        return (
            <TouchableOpacity style={styles.toggle} onPress={() => {
                console.log('Main Map redirection clicked');
                navigation.navigate('Home');
            } } key={`spots_${index}`}>
                <Text style={styles.specialText}>{text}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    console.log("Pressed back button");
                    navigation.navigate('Settings');
                }}>
                    <View style={styles.backButton}>
                        <Image
                            source={require('../assets/back-button-secondary-color.png')}
                            style={styles.image}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
            </View>
            <Text style={styles.subtitle}>Status notifications</Text>
            <View style={styles.settingsItems}>
                {statusList.map((buttonText, index) => renderStatusToggleBox(buttonText, index))}
            </View>
            <Text style={styles.subtitle}>Location notifications</Text>
            <View style={styles.settingsItems}>
                {locationList.map((buttonText, index) => renderLocationToggleBox(buttonText, index))}
            </View>
            <Text style={styles.subtitle}>Spots notifications</Text>
            <View style={styles.settingsItems}>
                {spotsList.map((buttonText, index) => renderSpotsToggleBox(buttonText, index))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C6765',
    },
    header: {
        marginTop: 50,
    },
    title: {
        color: '#E7EFCA',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        paddingLeft: '10%',
        alignSelf: 'center',
    },
    subtitle: {
        color: '#D5B747',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: -15,
        paddingTop: 20,
        opacity: .9
    },
    specialText: {
        color: '#D5B747',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: .9,
        paddingHorizontal: '10%'
    },
    image: {
        height: 50,
        width: 50,
        position: 'absolute',
        left: 20,
    },
    settingsItems: {
        marginTop: 20,
        backgroundColor: '#E7EFCA',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
    },
    toggle: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,

    },
    toggleText: {
        marginBottom: '-7%',
        paddingTop: '7%',
        paddingLeft: "10%",
        fontSize: 20,
        color: '#2C6765',
        fontWeight: 'bold',
    },
    toggleSwitch: {
        paddingBottom: '8%',
        marginTop: '-8%',
        marginRight: '5%',
    }

})

