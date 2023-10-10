import * as React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import{ createBottomTabNavigator } from '@react-navigation/bottom tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import Home from './screens/Home';
import Profile from './screens/profile';
import FriendsList from './screens/FriendsList';

//Screen Name
const homeName = 'Home';
const profileName = 'Profile';
const friendsListName = 'Friends List';

const bTab = createBottomTabNavigator();




export default function MainContainer(){
    return(
        <NavigationContainer>
            <bTab.Navigator
                initialRouteName={homeName}            
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === profileName) {
                            iconName = focused ? 'profile' : 'profile-outline'
                        } else if (rn === friendsListName) {
                            iconName = focused ? 'list' : 'list-outline'
                        }

                        return <Ionicons name = {iconName} size ={size} color = {color}/>
                    },
                })}
                tabBarOptions = {{
                    activeTintColor:  '',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70}

                }}


                >

                    <bTab.Screen name ={homeName} component = {Home}/>
                    <bTab.Screen name ={profileName} component = {Profile}/>
                    <bTab.Screen name ={friendsListName} component = {FriendsList}/>



                 </bTab.Navigator>
        </NavigationContainer>
    )
}