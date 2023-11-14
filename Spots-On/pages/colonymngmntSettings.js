import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ColonyManagement({ navigation }) {

  const detailList = ["Edit Colony Name"];

  // Create an array of functions to handle button actions
  const detailButtonActions = [
    () => {
        console.log('editing colony name');
    },
  ];

  //gotta change admin to a real role
  const mngmntList = ["My Role: " + "admin", "Change Admin Status", "Add Colony Members", "Delete Colony Members", "Set Spot access", "Leave Colony"];

  const mngmntButtonActions = [
    () => {
        console.log('my role clicked');
    },
    () => {
        console.log('change admin status clicked');
    },
    () => {
        console.log('add colony members clicked');
    },
    () => {
      console.log('delete colony members clicked');
  },
  () => {
    console.log('set bubble access clicked');
},
() => {
  console.log('leave colony clicked');
},
  ];

  const renderDetailButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={detailButtonActions[index]} key={text}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderMngmntButton = (text, index) => {
    return (
      <TouchableOpacity style={styles.buttons} onPress={mngmntButtonActions[index]} key={text}>
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
        <Text style={styles.title}>ColonyName</Text>
      </View>
      <Text style={styles.subtitle}>Colony details</Text>
      <View style={styles.settingsItems}>
        {detailList.map((buttonText, index) => renderDetailButton(buttonText, index))}
      </View>
      <Text style={styles.subtitle}>Colony Management</Text>
      <View style={styles.settingsItems}>
        {mngmntList.map((buttonText, index) => renderMngmntButton(buttonText, index))}
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
      width: '80%',
      marginLeft: '10%',
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

