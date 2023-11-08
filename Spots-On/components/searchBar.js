import React from "react";
import { StyleSheet, Image, View, TextInput, TouchableOpacity } from 'react-native';

export default function SearchBar({ imageSource, style }) {
    return (
        <View style={[style, styles.shadow]}>
            <View style={styles.button}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for groups"
                    placeholderTextColor='white'
                    // value={searchText}
                    // onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={() => {
                    console.log("Pressed search button");
                }}>
                    <Image 
                        source={imageSource}
                        style={styles.image}
                    />
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 270,
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(44, 103, 101, .7)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 45,
        width: 250,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        width: 30,
        height: 30,
        right: 35
    },
    shadow: {
        elevation: 20,
        shadowColor: '#000',
        borderRadius: 50,
    }
});