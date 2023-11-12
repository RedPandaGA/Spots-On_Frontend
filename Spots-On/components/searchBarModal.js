import React from "react";
import { StyleSheet, Image, View, TextInput } from 'react-native';

export default function SearchBarModal({ imageSource, style, color }) {
    return (
        <View style={[style, styles.shadow]}>
            <View style={styles.button}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for groups or people"
                    placeholderTextColor='#2C6765'
                    // value={searchText}
                    // onChangeText={setSearchText}
                />
                <Image 
                    source={imageSource}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 300,
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#E7EFCA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 45,
        width: 250,
        color: '#2C6765',
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        width: 30,
        height: 30,
        right: 5,
        tintColor: '#2C6765'
    },
    shadow: {
        elevation: 2,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .6,
        shadowRadius: 3,
        borderRadius: 50,
    },
});