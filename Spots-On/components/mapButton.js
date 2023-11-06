import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

export default function MapButton({ imageSource, onPress, style, width, height, active }) {
    let backgroundColor = 'rgba(44, 103, 101, .8)';
    if (active) {
        backgroundColor = 'rgba(255, 85, 85, .8)'
    }
    
    return (
        <View style={[style, styles.shadow]}>
            <TouchableOpacity onPress={onPress} >
                <View style={[styles.button, {width: width, height: height, backgroundColor: backgroundColor}]}>
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
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    image: {
        width: 35,
        height: 35,
    },
    shadow: {
        elevation: 20,
        shadowColor: '#000',
        borderRadius: 50,
    }
});