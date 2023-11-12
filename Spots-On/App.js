import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMap from './pages/mainMap';
import Settings from './pages/settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/landingPage';

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
      </Stack.Navigator>
    </NavigationContainer>

  );
}
