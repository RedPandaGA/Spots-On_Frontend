import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

export default function ColonySlider({ style }) {
    const [colony, setColony] = useState([
        { name: 'SASE', key: 1 },
        { name: 'lsu engineering', key: 2 },
        { name: 'swim friends', key: 3 },
        { name: 'ood group', key: 4 },
        { name: 'best friends', key: 5 },
        { name: 'volleyball', key: 6 },
        { name: 'oopah', key: 7 },
        { name: 'vsa', key: 8 },
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
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item.name)} >
                        <View style={styles.button}>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
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
        borderRadius: 50,
        paddingVertical: 11,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(44, 103, 101, .8)',
        height: 45,
        width: 100,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 50,
        elevation: 2,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    list: {
        marginRight: 20
    }
});