import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text } from "react-native";
import { GiftedChat, Bubble, Day } from "react-native-gifted-chat";
import COLORS from "../components/colors";

// Custom Bubble component
const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: COLORS.secondary,
        },
        right: {
          backgroundColor: COLORS.darkblackgreen,
        },
      }}
    >
      <Text
        style={{
          left: {
            color: COLORS.primary,
          },
          right: {
            color: COLORS.secondary,
          },
        }}
      >
        {props.text}
      </Text>
    </Bubble>
  );
};

const CustomDay = (props) => {
  return (
    <Day
      {...props}
      textStyle={{
        color: COLORS.gray, // Change this to the color you want for the date and year
      }}
    />
  );
};

export default function ColonyChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const onSend = () => {
    if (inputText.trim() === "") {
      return;
    }

    // Add the user"s message to the chat
    const newMessages = [
      {
        _id: messages.length + 1,
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User", // You can set the user"s name dynamically if needed
        },
      },
    ];

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Home");
          console.log("Pressed back button");
        }}>
          <View>
            <Image
              source={require("../assets/backButton.png")}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>ColonyName</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Home");
          console.log("Pressed three dots button");
        }}>
          <View style={styles.threeDots}>
            <Image
              source={require("../assets/threeDots.png")}
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
                <Image
                  source={require("../assets/sendIcon.png")}
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        renderBubble={(props) => <CustomBubble {...props} />}
        renderDay={(props) => <CustomDay {...props} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    marginTop: 50,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 20,
    tintColor: COLORS.secondary
  },
  threeDots: {
    height: 30,
    width: 30,
    top: -18,
    left: 150,
    tintColor: COLORS.secondary
  },
  inputToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    marginTop: -3
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: COLORS.secondary,
    fontSize: 17,
    backgroundColor: COLORS.darkblackgreen,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain", // Adjust the resizeMode as needed
    tintColor: COLORS.secondary,
  },
});
