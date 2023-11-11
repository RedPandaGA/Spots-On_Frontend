import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const LandingPage = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to the create account screen
    navigation.navigate('Signup');
  };

  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide}>
        <Text style={styles.text}>Page 1</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Page 2</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Page 3</Text>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleGetStarted}>
          <Text style={styles.createAccountButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C6765',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#305c5c',
    borderRadius: 10,
  },
  createAccountButtonText: {
    color: '#E7EFCA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
