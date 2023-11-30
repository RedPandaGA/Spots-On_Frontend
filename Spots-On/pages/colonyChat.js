import React, { useEffect, useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import Config from "../.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const papiUrl = Config.PAPI_URL;

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

export default function ColonyChat({ navigation, route }) {
    

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const [isThreeDotsVisible, setIsThreeDotsVisible] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(false);

  useEffect(()=>{
    console.log("messages: " + JSON.stringify(messages));
},[messages]);

const getMsg = async () => {
    try {
        // Get the authorization token from AsyncStorage
        const authToken = await AsyncStorage.getItem("token");
        //console.log(JSON.stringify({ location: user.currentLocation }))
        if (!authToken) {
          // Handle the case where the token is not available
          console.error("Authorization token not found.");
          return;
        }
        
        const response = await fetch(`${papiUrl}/getmessages/${item.gid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
          },
        });
  
        if (!response.ok) {
          // Handle error, e.g., display an error message
          console.error("Error Getting msgs:", response.status);
          return;
        }
        responsedata = await response.json();
        // Successfully updated user location
        //console.log('User got msgs successfully: ' + JSON.stringify(responsedata));
        await setMessages(responsedata.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error:", error);
        // Handle other errors as needed
      }
  }

useEffect(() => {
    const msgCheck = setInterval(async () => {
        getMsg();
      }, 1000); // 30 seconds
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(msgCheck);
}, []);

//   const route = useRoute();
  const { item, colonies, user } = route.params;
  console.log("user: " + user.uid);
  console.log("item: " + JSON.stringify(item));

  const sendMsg = async (sendMsg) => {
    try {
        // Get the authorization token from AsyncStorage
        const authToken = await AsyncStorage.getItem("token");
        //console.log(JSON.stringify({ location: user.currentLocation }))
        if (!authToken) {
          // Handle the case where the token is not available
          console.error("Authorization token not found.");
          return;
        }
        
        const response = await fetch(`${papiUrl}/sendmessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Attach the token to the Authorization header
          },
          body: JSON.stringify({ gid: item.gid, message: sendMsg}),
        });
  
        if (!response.ok) {
          // Handle error, e.g., display an error message
          console.error("Error updating user location:", response.status);
          return;
        }
        responsedata = await response.json();
        // Successfully updated user location
        console.log('User sent msg successfully: ' + JSON.stringify(responsedata));

      } catch (error) {
        console.error("Error:", error);
        // Handle other errors as needed
      }
  }

  const onSend = () => {
    if (inputText.trim() === "") {
      return;
    }
    
    // Add the user"s message to the chat
    const newMessage = {
        _id: (`${messages.length + 1} ` + user.uid),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: user.uid,
          name: user.nickname, // You can set the user"s name dynamically if needed
        },
      }


    try{
        sendMsg(newMessage);
    } catch {
        console.log("message failed.");
    }
    setMessages(GiftedChat.append(messages, newMessage));
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
      <View
        style={
          Platform.OS == "android" ? styles.headerAndroid : styles.headerIOS
        }
      >
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
        onSend={() => onSend()}
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
    paddingBottom: 10,
  },
  headerAndroid: {
    paddingTop: 50,
    backgroundColor: COLORS.lighterprimary,
    height: 120,
  },
  headerIOS: {
    paddingTop: 70,
    backgroundColor: COLORS.lighterprimary,
    height: 120,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    top: -5,
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
