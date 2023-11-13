import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Account({ navigation }) {

  const colonyList = ["Notifications", "Colony Management", "Location Sharing"];

  // Create an array of functions to handle button actions
  const colonyButtonActions = [
    () => {
        console.log('Notifications clicked');
    },
    () => {
        console.log('Colony management clicked');
        // Handle specific action for Button 2
        // You can customize this function for each button
    },
    () => {
        console.log('Location sharing clicked');
        // Handle specific action for Button 3
    },
  ];

  const universalList = ["Account", "Privacy & Security", "About", "Log Out"];

  const universalButtonActions = [
    () => {
        console.log('Account clicked');
        navigation.navigate('Account');
    },
    () => {
        console.log('Privacy & Security clicked');
        // Handle specific action for Button 2
        // You can customize this function for each button
    },
    () => {
        console.log('About clicked');
        // Handle specific action for Button 3
    },
    () => {
      console.log('Log out clicked');
      // Handle specific action for Button 3
  }
  ];

  const renderColonyButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={colonyButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderUniversalButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={universalButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Settings');
          console.log("Pressed back button");
        }}>
          <View style={styles.backButton}>
            <Image 
              source={require('../assets/back-button-secondary-color.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Account</Text>
      </View>
      <Text style={styles.subtitle}>Account details</Text>
      <View style={styles.settingsItems}>
        {colonyList.map((buttonText, index) => renderColonyButton(buttonText, index))}
      </View>
      <Text style={styles.subtitle}>Account management</Text>
      <View style={styles.settingsItems}>
        {universalList.map((buttonText, index) => renderUniversalButton(buttonText, index))}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2C6765',
    },
    header: {
      marginTop: 50,
    },
    title: {
      color: '#E7EFCA',
      fontSize: 40,
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: 1,
      width: '50%',
      alignSelf: 'center'
    }, 
    subtitle: {
      color: '#D5B747',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 20,
      marginBottom: -15,
      paddingTop: 20,
      opacity: .9
    }, 
    image: {
      height: 50,
      width: 50,
      position: 'absolute',
      left: 20,
    },
    settingsItems: {
      marginTop: 20,
      backgroundColor: '#E7EFCA',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 15,
    },
    buttons: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      color: '#2C6765',
      fontWeight: 'bold',

    }

})

