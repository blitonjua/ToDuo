import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import WelcomeScreen from "./welcomeScreen";
import Settings from './settings';
import GoalScreen from './GoalScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <SafeAreaView style={{flex:1}}>
        <Tab.Navigator initialRouteName="Home" tabBarPosition="bottom">
                <Tab.Screen name ="Settings" component={Settings}/>
                <Tab.Screen name ="Home" component={WelcomeScreen}/>
                <Tab.Screen name ="+" component={GoalScreen}/>
        </Tab.Navigator>
        </SafeAreaView>
    )
}

export default MyTabs;