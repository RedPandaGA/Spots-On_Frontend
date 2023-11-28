import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { GiftedChat, Bubble, Day, Time } from "react-native-gifted-chat";
import COLORS from "../components/colors";
import ThreeDotsModal from "../components/threeDotsModal.js";
import ColonyChatList from "../components/colonyChatList.js";
import { useRoute } from '@react-navigation/native';

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
        color: props.position === "left" ? COLORS.primary : COLORS.secondary,
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

export default function ColonyChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const [isThreeDotsVisible, setIsThreeDotsVisible] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(false);

  const route = useRoute();
  const { item, colonies } = route.params;

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

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setInputText("");
  };

  const toggleThreeDots = () => {
    setIsThreeDotsVisible(!isThreeDotsVisible);
    console.log("toggle three dots");
  };

  const toggleChatList = () => {
    setIsChatListVisible(!isChatListVisible);
    console.log("toggle chat list");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleChatList}>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            console.log("Pressed back button");
          }}
        >
          <Image
            source={require("../assets/backButton.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleThreeDots}>
          <View style={styles.threeDots}>
            <Image
              source={require("../assets/threeDots.png")}
              style={styles.threeDots}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ThreeDotsModal
        isModalVisible={isThreeDotsVisible}
        hideModal={toggleThreeDots}
      />
      <ColonyChatList
        isModalVisible={isChatListVisible}
        hideModal={toggleChatList}
        navigation={navigation}
        colonies={colonies}
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
              <TouchableOpacity
                onPress={() => onSend()}
                style={styles.sendButton}
              >
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
    paddingBottom: 10
  },
  header: {
    paddingTop: 50,
    backgroundColor: COLORS.lighterprimary,
    height: 120,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    top: -5
  },
  backButton: {
    height: 50,
    width: 50,
    left: 20,
    top: -48,
    position: "absolute",
    tintColor: COLORS.secondary,
  },
  threeDots: {
    height: 45,
    width: 45,
    top: -22,
    left: "73%",
    tintColor: COLORS.secondary,
  },
  inputToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: -10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
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
});
