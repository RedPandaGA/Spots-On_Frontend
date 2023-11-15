import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, ScrollView } from "react-native";
import COLORS from "../components/colors";

export default function Notifications({ navigation }) {

    const statusList = ["friend1", "friend2", "friend3"];

    const locationList = ["friend1", "friend2", "friend3"];

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
            <View key={`status_${index}`}>
                <Text style={styles.toggleText}>{text}</Text>
                <Switch
                    style={styles.toggleSwitch}
                    value={statusSwitches[text]}
                    onValueChange={() =>
                        handleStatusToggle(text)}
                    trackColor={{
                        false: COLORS.darkblackgreen, // color when switch is off
                        true: COLORS.gold,  // color when switch is on
                    }}
                    thumbColor={statusSwitches[text] ? COLORS.white : COLORS.lightwhitegreen}
                />
            </View>
        );
    };

    const renderLocationToggleBox = (text, index) => {
        return (
            <View key={`location_${index}`}>
                <Text style={styles.toggleText}>{text}</Text>
                <Switch
                    style={styles.toggleSwitch}
                    value={locationSwitches[text]}
                    onValueChange={() =>
                        handleLocationToggle(text)}
                    trackColor={{
                        false: COLORS.darkblackgreen, // color when switch is off
                        true: COLORS.gold,  // color when switch is on
                    }}
                    thumbColor={locationSwitches[text] ? COLORS.white : COLORS.lightwhitegreen}
                />
            </View>
        );
    };

    const renderSpotsToggleBox = (text, index) => {
        return (
            <TouchableOpacity style={styles.toggle} onPress={() => {
                console.log("Main Map redirection clicked");
                navigation.navigate("Home");
            }} key={`spots_${index}`}>
                <Text style={styles.specialText}>{text}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        console.log("Pressed back button");
                        navigation.navigate("Settings");
                    }}>
                        <View style={styles.backButton}>
                            <Image
                                source={require("../assets/back-button-secondary-color.png")}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        marginTop: 50,
    },
    title: {
        color: COLORS.secondary,
        fontSize: 40,
        fontWeight: "bold",
        marginLeft: 50,
        alignSelf: "center",
    },
    subtitle: {
        color: COLORS.gold,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: -15,
        paddingTop: 20,
        opacity: .9
    },
    specialText: {
        color: COLORS.gold,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        opacity: .9,
        paddingHorizontal: 10
    },
    image: {
        height: 50,
        width: 50,
        position: "absolute",
        left: 20,
    },
    settingsItems: {
        marginTop: 20,
        backgroundColor: COLORS.secondary,
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
    },
    toggle: {
        justifyContent: "center",
        paddingVertical: 20,
    },
    toggleText: {
        marginBottom: -20,
        paddingTop: 20,
        paddingLeft: 30,
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: "bold",
    },
    toggleSwitch: {
        paddingBottom: 20,
        marginTop: -28,
        marginRight: 15,
    }
})

