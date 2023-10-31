import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapButton from './components/navButton';
import MapView from 'react-native-maps';
import MainMap from './pages/mainMap';

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   {/* <Button title='submit' color='maroon'></Button> */}
    //   {/* <MapButton text='Button'/> */}
    //   
    //   <StatusBar style="auto" />
      
    // </View>
    // <MainMap />
    <View style={styles.container}>
      <MainMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
});
