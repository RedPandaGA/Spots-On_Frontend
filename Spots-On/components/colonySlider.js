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
                    <View>
                        <TouchableOpacity onPress={() => onPress(item.name)} >
                            <View style={styles.button}>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(44, 103, 101, .9)',
        height: 45,
        width: 100,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    shadow: {
        elevation: 20,
        shadowColor: '#000',
        borderRadius: 50,
    },
    list: {
        width: '41%'
    }
});