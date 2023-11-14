import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from '../components/carousel';

export default function Milantesting({ navigation }) {
    return (
        <View style={styles.container}>
            <Carousel />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C6765',
    },
});
