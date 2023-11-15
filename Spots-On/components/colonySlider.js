import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import COLORS from "./colors";

export default function ColonySlider({ style }) {
    const [colony, setColony] = useState([
        { name: 'SASE', selected: false },
        { name: 'lsu engineering', selected: false },
        { name: 'swim friends', selected: false },
        { name: 'ood group', selected: false },
        { name: 'best friends', selected: false },
        { name: 'volleyball', selected: false },
        { name: 'oopah', selected: false },
        { name: 'vsa', selected: false }
    ]);

    const onPress = (name) => {
        console.log(name);
    };
    
    return (
        <View style={style}>
            <FlatList
                style={styles.list}
                horizontal
                data={colony}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => onPress(item.name)} >
                            <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        paddingVertical: 11,
        paddingHorizontal: 10,
        height: 45,
        minWidth: 100,
    },
    shadow: {
        elevation: 2,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .6,
        shadowRadius: 3,
        borderRadius: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    list: {
        marginLeft: 16,
    }
});