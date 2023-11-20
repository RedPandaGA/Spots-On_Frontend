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

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSignup = () => {
    if (!phoneNumber || !email || !password || !confirmPassword) {
      setAlertTitle('Incomplete Fields');
      setAlertMessage('Please fill in all the fields.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertTitle('Passwords Mismatch');
      setAlertMessage('Please match the passwords.');
      setShowAlert(true);
      return;
    }

    console.log('Created an Account: ' + phoneNumber + ' with password: ' + password);
    navigation.navigate('Home');
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
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.secondary}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={COLORS.secondary}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
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
});

export default Signup;
