import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

export default function SearchBar({ imageSource, onPress, style, width, height }) {
    return (
        <View style={[style, styles.shadow]}>
            <TouchableOpacity onPress={onPress} >
                <View style={styles.button}>
                    <Image 
                        source={imageSource}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'rgba(44, 103, 101, .8)',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 30,
        height: 30,
        left: 5
    },
    shadow: {
        elevation: 10,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        borderRadius: 50,
    }
});