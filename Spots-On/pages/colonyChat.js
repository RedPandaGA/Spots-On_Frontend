import React, { useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text } from 'react-native';
import COLORS from '../components/colors';

export default function ColonyChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const onSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    // Add the user's message to the chat
    const newMessages = [
      {
        _id: messages.length + 1,
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User', // You can set the user's name dynamically if needed
        },
      },
    ];

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    setInputText('');
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: COLORS.secondary, // Change this to the color you want for received messages
          },
          right: {
            backgroundColor: COLORS.darkblackgreen, // Change this to the color you want for sent messages
          },
        }}
      />
    );
  };

  const renderMessageText = (props) => {
    return (
      <Text
        {...props}
        style={{
          left: {
            color: COLORS.primary,
          },
          right: {
            color: COLORS.secondary,
          },
        }}
      />
    );
  };

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
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
        renderInputToolbar={(props) => {
          // Optional: Customize the input toolbar
          return (
            <View style={styles.inputToolbarContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                placeholderTextColor={COLORS.secondary}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
              />
              <TouchableOpacity onPress={() => onSend()} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderBubble={renderBubble} // Add this line to customize the message bubbles
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
  inputToolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
  },
  input: { //input text
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: COLORS.secondary,
    fontSize: 17,
    // fontWeight: 'bold',
    backgroundColor: COLORS.darkblackgreen,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#E7EFCA',
    fontWeight: 'bold',
  },
});
