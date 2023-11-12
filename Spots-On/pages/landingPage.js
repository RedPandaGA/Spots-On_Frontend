import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const LandingPage = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to the create account screen
    navigation.navigate('Signup');
  };

  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false} dotStyle={styles.paginationDot}
    activeDotStyle={styles.activePaginationDot}>
      <View style={styles.slide}>
        <Text style={styles.text}>Plan</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Meet</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Connect</Text>
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
  paginationDot: {
    backgroundColor: '#305c5c', // Change the color of inactive dots
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activePaginationDot: {
    backgroundColor: '#E7EFCA', // Change the color of active dot
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default LandingPage;
