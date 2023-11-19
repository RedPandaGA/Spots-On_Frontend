import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text } from "react-native";
import { GiftedChat, Bubble, Day, Time } from "react-native-gifted-chat";
import COLORS from "../components/colors.js";
import ProfileModal from "../components/profileModal.js";

const renderBubble = (props) => (
<Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: COLORS.secondary,
      },
      right: {
        backgroundColor: COLORS.darkerprimary,
      },
    }}
    textProps={{
      style: {
        color: props.position === 'left' ? COLORS.primary : COLORS.secondary,
      },
    }}
    textStyle={{
      left: {
        color: COLORS.primary,
      },
      right: {
        color: COLORS.secondary,
      },
    }}
  />
);

const CustomDay = (props) => {
  return (
    <Day
      {...props}
      textStyle={{
        color: COLORS.gray,
      }}
    />
  );
};

export default function FriendChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const [isProfileVisible, setIsProfileVisible] = useState(false);

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

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
    console.log("toggle profile")
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={toggleProfile}>
        <Image source={require("../assets/profilePicture.png")} style={styles.profilePicture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleProfile}>
        <Text style={styles.title}>Faris Khattak</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            navigation.navigate("Home");
            console.log("Pressed back button");
          }}>
              <Image
                source={require("../assets/backButton.png")}
                style={styles.backButton}
              />
          </TouchableOpacity>
      </View>
      <ProfileModal
        isModalVisible={isProfileVisible}
        hideModal={toggleProfile}
      />
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
        renderBubble={renderBubble}
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
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.lighterprimary,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
  },
  backButton: {
    height: 50,
    width: 50,
    left: 20,
    top: -105,
    position: 'absolute',
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
    backgroundColor: COLORS.darkerprimary,
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
  profilePicture: {
    height: 60,
    width: 60,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 5,
    borderColor: COLORS.red,
    borderWidth: 3
  },
});