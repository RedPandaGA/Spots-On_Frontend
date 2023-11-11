// LoginScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Add your login logic here

    // Navigate to the main app screen
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
