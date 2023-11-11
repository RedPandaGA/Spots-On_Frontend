import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navigate to the main app screen
    console.log("Logged into account: " + phoneNumber + " with password: " + password);
    navigation.navigate('Home');
  };

  const handleSignup = () => {
    // Navigate to the main app screen
    console.log("Clicked Create Account");
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/ladybugfixed.png')} style={styles.icon} />
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <TextInput
        style={[styles.input, { marginTop: 50 }]}
        keyboardType="numeric"
        placeholder="Phone #"
        placeholderTextColor={"#E7EFCA"}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#E7EFCA"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, { alignSelf: 'center', marginTop: 30 }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { alignSelf: 'center', marginTop: 20 }]}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C6765',
    paddingTop: '30%'
  },
  icon: {
    width: 150,
    height: 150,
    // shadowColor: '#000',
  },

  input: {
    height: 50,
    width: '90%',
    borderColor: '#305c5c',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: "#E7EFCA",
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    borderRadius: 30,
    height: 48,
    width: '50%',
    backgroundColor: "#305c5c",
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#E7EFCA',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

export default Login;
