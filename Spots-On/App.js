import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMap from './pages/mainMap';
import Settings from './pages/settings';


const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <MainMap />
    // </View>
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

    // <View>
    //   <ColonySlider />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
// });
