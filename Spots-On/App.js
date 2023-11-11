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

// import React, { useState } from "react";
// import { Modal, Text, View, Button, StyleSheet } from "react-native";

// export function ModalA({ isVisible, onClose }) {
//   return (
//     <Modal transparent={true} visible={isVisible} animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text>Content A</Text>
//           <Button title="Close Modal" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// export function ModalB({ isVisible, onClose }) {
//   return (
//     <Modal transparent={true} visible={isVisible} animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text>Content B</Text>
//           <Button title="Close Modal" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// export default function MyModal() {
//   const [showModalA, setShowModalA] = useState(false);
//   const [showModalB, setShowModalB] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button title="Open Modal A" onPress={() => setShowModalA(true)} />
//         <Button title="Open Modal B" onPress={() => setShowModalB(true)} />
//       </View>

//       <ModalA isVisible={showModalA} onClose={() => setShowModalA(false)} />
//       <ModalB isVisible={showModalB} onClose={() => setShowModalB(false)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: 300,
//   },
// });
