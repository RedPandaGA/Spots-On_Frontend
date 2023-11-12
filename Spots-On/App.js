import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMap from './pages/mainMap';
import Settings from './pages/settings';
import Login from './pages/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
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