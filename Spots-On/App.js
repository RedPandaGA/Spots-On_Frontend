import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainMap from "./pages/mainMap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/landingPage";
import Settings from "./pages/settings";
import Notifications from "./pages/notifSettings";
import ColonyManagement from "./pages/colonymngmntSettings";
import LocationSharing from "./pages/locationSettings";
import Account from "./pages/accSettings";
import ColonyChat from './pages/colonyChat';
import FriendChat from './pages/friendChat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ColonyManagement"
          component={ColonyManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSharing"
          component={LocationSharing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ColonyChat'
          component={ColonyChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FriendChat'
          component={FriendChat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
