import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Notifications({ navigation }) {

  const statusList = ["friend1", "friend2", "friend3"];

  const statusToggleActions = [
    () => {
        console.log('friend1 clicked');
    },
    () => {
        console.log('friend2 clicked');
    },
    () => {
        console.log('friend3 clicked');
    },
  ];

  const locationList = ["friend1", "friend2", "friend3"];

  const locationToggleActions = [
    () => {
        console.log('friend1 clicked');
    },
    () => {
        console.log('friend2 clicked');
    },
    () => {
        console.log('friend3 clicked');
    },
  ];

  const spotsList = ["Edit your Spots notifications on the Main Map page"];

  const spotsToggleActions = [
    () => {
        console.log('Main Map redirection clicked');
        navigation.navigate('Home');
    }];

  const renderStatusToggleBox = (text, index) => {
    return (
      <TouchableOpacity style={styles.toggle} onPress={statusToggleActions[index]} key={text}>
        <Text style={styles.toggleText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderLocationToggleBox = (text, index) => {
    return (
      <TouchableOpacity style={styles.toggle} onPress={locationToggleActions[index]} key={text}>
        <Text style={styles.toggleText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderSpotsToggleBox = (text, index) => {
    return (
      <TouchableOpacity style={styles.toggle} onPress={spotsToggleActions[index]} key={text}>
        <Text style={styles.specialText}>{text}</Text>
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
        <Text style={styles.title}>Notifications</Text>
      </View>
      <Text style={styles.subtitle}>Status notifications</Text>
      <View style={styles.settingsItems}>
        {statusList.map((buttonText, index) => renderStatusToggleBox(buttonText, index))}
      </View>
      <Text style={styles.subtitle}>Location notifications</Text>
      <View style={styles.settingsItems}>
        {locationList.map((buttonText, index) => renderLocationToggleBox(buttonText, index))}
      </View>
      <Text style={styles.subtitle}>Spots notifications</Text>
      <View style={styles.settingsItems}>
        {spotsList.map((buttonText, index) => renderSpotsToggleBox(buttonText, index))}
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
      width: '100%',
      paddingLeft: '10%',
      alignSelf: 'center',
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
    specialText: {
        color: '#D5B747',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: .9,
        paddingHorizontal: '10%'
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
    toggle: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      
    },
    toggleText: {
      textAlign: 'center',
      fontSize: 20,
      color: '#2C6765',
      fontWeight: 'bold',
    }

})

