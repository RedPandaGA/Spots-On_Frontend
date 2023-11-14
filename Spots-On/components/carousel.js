import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const Carousel = () => {
  return (
    <Swiper
    // showsButtons={true}
      style={styles.wrapper}
      paginationStyle={styles.pagination}
      dotStyle={styles.paginationDot}
      activeDotStyle={styles.activePaginationDot}
    >
      <View style={styles.slide}>
        <Text style={styles.text}>Page 1</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Page 2</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Page 3</Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%', 
    width: '80%', 
    marginLeft: '10%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EFCA',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  pagination: {
    bottom: "60%", // Adjust this value to position the dots as needed
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D5B747',
    margin: 3,
  },
  activePaginationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E7EFCA',
    margin: 3,
  },
});

export default Carousel;
