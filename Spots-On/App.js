import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMap from './pages/mainMap';
import Login from './pages/login';
import Signup from './pages/signup';
import LandingPage from './pages/landingPage';
import Settings from './pages/settings';
import Notifications from './pages/notifSettings';
import Account from './pages/accSettings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage'>
      <Stack.Screen 
          name='LandingPage' 
          component={LandingPage} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Signup' 
          component={Signup} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Login' 
          component={Login} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Home' 
          component={MainMap} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Settings' 
          component={Settings} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Notifications' 
          component={Notifications} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Account' 
          component={Account} 
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
