import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import COLORS from "../components/colors";
import CustomAlert from '../components/alert';
import Config from '../.config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = Config.API_URL;

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Function to check if the phone number is already used (mock implementation)
  const isPhoneNumberUsed = (phoneNumber) => {
    // Mock implementation checking if the number is already used
    return false; // Change this logic based on your data structure or API call
  };

  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!phoneNumber || !email || !password || !confirmPassword) {
      setAlertTitle('Incomplete Fields');
      setAlertMessage('Please fill in all the fields.');
      setShowAlert(true);
      return;
    }

    if (!isValidEmail(email)) {
      setAlertTitle('Invalid Email');
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertTitle('Passwords Mismatch');
      setAlertMessage('Please match the passwords.');
      setShowAlert(true);
      return;
    }

    if (isPhoneNumberUsed(phoneNumber)) {
      setAlertTitle('Phone Number Exists');
      setAlertMessage('This phone number is already in use.');
      setShowAlert(true);
      return;
    }

    const atIndex = email.indexOf('@');
    const nickname = email.slice(0, atIndex)

    const userData = {
        email: email,
        pass: password,
        pnum: phoneNumber,
        nickname: nickname
    };

    try {
        const response = await fetch(`${apiUrl}/createUser`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.error('Error creating user:', response.status);
            return;
        }

        const data = await response.json();
        const receivedToken = data.token;
        const newuid = data.uid;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', receivedToken);
        await AsyncStorage.setItem('uid', newuid);

        console.log('Created an Account: ' + await AsyncStorage.getItem('token') + " uid: " + await AsyncStorage.getItem('uid'));
        navigation.navigate('Home');
    } catch (error) {
        console.error('Error:', error);
        // Handle other errors as needed
    }
  };

  const handleLogin = () => {
    // Navigate to the main app screen
    console.log("Already have an account");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <Image
          source={require("../assets/ladybugfixed.png")}
          style={styles.icon}
        />
      </View>

      <TextInput
        style={[styles.input, { marginTop: 30 }]}
        keyboardType="numeric"
        placeholder="Phone #"
        placeholderTextColor={COLORS.secondary}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.secondary}
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.secondary}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Image
            source={isPasswordVisible ? require("../assets/noeye.png") : require("../assets/eye.png")}
            style={styles.eyecon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.secondary}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!isPasswordVisible1}
        />
        <TouchableOpacity onPress={togglePasswordVisibility1} style={styles.eyeIcon}>
          <Image
            source={isPasswordVisible1 ? require("../assets/noeye.png") : require("../assets/eye.png")}
            style={styles.eyecon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center", marginTop: 30 }]}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={[styles.buttonText, { marginTop: 20 }]}>
        Already have an account?
      </Text>
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {/* ... (rest of your code remains the same) */}
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: "20%",
  },
  icon: {
    width: 150,
    height: 150,
  },
  input: {
    height: 50,
    width: "90%",
    borderColor: "#305c5c",
    borderWidth: 2,
    margin: 8,
    padding: 10,
    borderRadius: 10,
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    borderRadius: 30,
    height: 48,
    width: "50%",
    backgroundColor: COLORS.darkerprimary,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12,
  },
  shadow: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: 100,
  },
  passwordContainer: {
    width: '100%',
    alignItems: 'center'
  },
  eyecon: {
    height: 30,
    width: 30,
    tintColor: COLORS.darkerprimary,
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 20
  },
});

export default Signup;
