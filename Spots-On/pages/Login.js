import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import COLORS from "../components/colors";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Navigate to the main app screen
    console.log(
      "Logged into account: " + phoneNumber + " with password: " + password
    );
    navigation.navigate("Home");
  };

  const handleSignup = () => {
    // Navigate to the main app screen
    console.log("Clicked Create Account");
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <Image
          source={require("../assets/ladybugfixed.png")}
          style={styles.icon}
        />
      </View>
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <TextInput
        style={[styles.input, { marginTop: 50 }]}
        keyboardType="numeric"
        placeholder="Phone #"
        placeholderTextColor={COLORS.secondary}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.secondary}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center", marginTop: 30 }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center", marginTop: 20 }]}
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
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: "30%",
  },
  icon: {
    width: 150,
    height: 150,
  },
  input: {
    height: 50,
    width: "90%",
    borderColor: COLORS.darkerprimary,
    borderWidth: 2,
    margin: 10,
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

export default Login;
