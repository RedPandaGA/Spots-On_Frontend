import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMap from './pages/mainMap';
import Settings from './pages/settings';

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

// import React, { useState } from 'react';
// import { Modal, View, Text, Animated, PanResponder, StyleSheet, TouchableOpacity } from 'react-native';
// import HorizontalDraggableModal from './components/horizontalDraggableModal';

// // const HorizontalDraggableModal = ({ isModalVisible, hideModal }) => {
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [modalPosition] = useState(new Animated.Value(0));

// //   const panResponder = PanResponder.create({
// //     onStartShouldSetPanResponder: () => true,
// //     onMoveShouldSetPanResponder: () => true,
// //     onPanResponderMove: (event, gestureState) => {
// //       if (isDragging) {
// //         modalPosition.setValue(gestureState.dx);
// //       }
// //     },
// //     onPanResponderRelease: (event, gestureState) => {
// //       if (isDragging) {
// //         setIsDragging(false);
// //         if (gestureState.dx > 100) {
// //           // Close the modal when swiped to the right (adjust threshold as needed)
// //           hideModal();
// //         } else {
// //           // Animate back to the initial position
// //           Animated.spring(modalPosition, { toValue: 0, useNativeDriver: false }).start();
// //         }
// //       }
// //     },
// //   });

// //   const onModalShow = () => {
// //     setIsDragging(true);
// //   };

// //   return (
// //     <Modal transparent visible={isModalVisible} onShow={onModalShow}>
// //       <View style={styles.modalContainer} {...panResponder.panHandlers}>
// //         <Animated.View style={[styles.modalContent, { transform: [{ translateX: modalPosition }] }]}>
// //           <Text style={styles.modalText}>Horizontally Draggable Modal</Text>
// //           <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
// //             <Text style={styles.closeButtonText}>Close</Text>
// //           </TouchableOpacity>
// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // };

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const hideModal = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={showModal} style={styles.showModalButton}>
//         <Text style={styles.showModalButtonText}>Show Modal</Text>
//       </TouchableOpacity>
//       <HorizontalDraggableModal isModalVisible={isModalVisible} hideModal={hideModal} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   showModalButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   showModalButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default App;
