import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FriendsList = ({friendName,status}) => {
  return (
    <View style={styles.friend}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.friendImage}
          source={require('../assets/marker.png')}
        />
        <Text style={styles.friendName}>{friendName}</Text> {/* Display friend's name */}
      </View>
      <Text style={styles.friendStatus}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  friend: {
    margin: 5,
    padding: 10,
    marginLeft: 50,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C6765',
  },
  friendStatus: {
    fontSize: 16,
    color: '#2C6765',
  },
  friendImage: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: -50,
  },
  infoContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'space-around',
  },
});

export default FriendsList;