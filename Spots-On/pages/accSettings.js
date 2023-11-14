import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Account({ navigation }) {

  const detailList = ["Edit Phone Number", "Edit Email Address", "Change Password"];

  // Create an array of functions to handle button actions
  const detailButtonActions = [
    () => {
        console.log('edit phone number clicked');
    },
    () => {
        console.log('edit email address clicked');
    },
    () => {
        console.log('change password clicked');
    },
  ];

  const otherList = ["Go Premium", "Delete Account"];

  const otherButtonActions = [
    () => {
        console.log('go premium clicked');
    },
    () => {
        console.log('delete account clicked');
    }
  ];

  const renderDetailButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={detailButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderOtherButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={otherButtonActions[index]} key={text}>
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
      <Image source={require('../assets/profilePicture.png')} style={styles.profilePicture} />
      <Image source={require('../assets/editIcon.png')} style={styles.editIcon1} />
      <View>
      <Text style={styles.nameText}>Faris Khattak</Text>
      <Image source={require('../assets/editIcon.png')} style={styles.editIcon2} />
      </View>
      <View style={styles.settingsItems}>
        {detailList.map((buttonText, index) => renderDetailButton(buttonText, index))}
      </View>
      <View style={styles.settingsItems}>
        {otherList.map((buttonText, index) => renderOtherButton(buttonText, index))}
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
    nameText: {
      color: '#E7EFCA',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      alignSelf: 'center'
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
    },
    profilePicture: {
      height: "30%",
      width: "70%",
      borderRadius: 360,
      marginLeft: '15%',
      marginVertical: 10
    },
    editIcon1: {
      height: 40,
      width: 40,
      tintColor: "#D5B747",
      position: 'absolute',
    bottom: '58%',
    right: '18%',
    },
    editIcon2: {
      height: 30,
      width: 30,
      tintColor: "#D5B747",
      position: 'absolute',
      right: '5%',
      bottom: '10%'
    }

})

