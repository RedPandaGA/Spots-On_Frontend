import React, { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
export default function ColonyChat({ navigation }) {
  const [chat, setChat] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
          console.log("Pressed back button");
        }}>
          <View>
            <Image 
              source={require('../assets/back-button-secondary-color.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>ColonyName</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
          console.log("Pressed three dots button");
        }}>
          <View style={styles.threeDots}>
            <Image 
              source={require('../assets/back-button-secondary-color.png')}
              style={styles.threeDots}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TextInput  
        style={styles.input}
        // placeholder=""
        placeholderTextColor={"#E7EFCA"}
        value={chat}
        onChangeText={(text) => setChat(text)}
      />
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
      fontSize: 35,
      textAlign: 'center',
      fontWeight: 'bold',
      width: '100%',
      paddingLeft: '3%',
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
    threeDots: {
      height: 40,
      width: 40,
      position: 'absolute',
      top: -20,
      right: 10,
    },
    input: {
      height: 40,
      width: '90%',
      borderColor: '#305c5c',
      borderWidth: 2,
      marginTop: '193%',
      margin: '5%',
      borderRadius: 30,
      color: "#E7EFCA",
      backgroundColor: "#305c5c",
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    
})
