import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Settings({ navigation }) {

  const personalList = ["My Account", "Privacy", "Notifications", "Display"];

  // Create an array of functions to handle button actions
  const personalButtonActions = [
    () => {
        console.log('My Account clicked');
    },
    () => {
        console.log('Privacy clicked');
        // Handle specific action for Button 2
        // You can customize this function for each button
    },
    () => {
        console.log('Notifications clicked');
        // Handle specific action for Button 3
    },
    () => {
        console.log('Display clicked');
        // Handle specific action for Button 4
    },
  ];

  const infoList = ["Accessibility", "Support", "Log Out"];

  const infoButtonActions = [
    () => {
        console.log('Accessibility clicked');
    },
    () => {
        console.log('Support clicked');
        // Handle specific action for Button 2
        // You can customize this function for each button
    },
    () => {
        console.log('Log Out clicked');
        // Handle specific action for Button 3
    }
  ];

  const renderPersonalButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={personalButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderInfoButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={infoButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
          console.log("Pressed back button");
        }}>
          <View style={styles.backButton}>
            <Image 
              source={require('../assets/back-button-secondary-color.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>

      </View>
      <View style={styles.settingsItems}>
        {personalList.map((buttonText, index) => renderPersonalButton(buttonText, index))}
      </View>
      <View style={styles.settingsItems}>
        {infoList.map((buttonText, index) => renderInfoButton(buttonText, index))}
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
      marginTop: 40,
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
    image: {
      height: 55,
      width: 55,
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

