import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Settings Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 50,
    }
})

