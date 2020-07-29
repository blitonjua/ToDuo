import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import ProfileScreen from './profileScreen';
import settingsStack from './settingsStack';
import PastGoalsScreen from './pastGoalsScreen';
import {headerStyles} from '../../../assets/styles/styles'

function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            mode='modal'
                screenOptions={{
                gestureEnabled: false,
            }}>
            <Stack.Screen name="profileScreen" component={ProfileScreen} 
                options={{headerShown: false}}/>
            <Stack.Screen name="settingsStack" component={settingsStack} 
                options={{
                    title:'Settings',
                    headerStyle: headerStyles.headerStyle,
                    headerTintColor: 'white',
                    headerBackTitle: ' ',
                    }}/>
            <Stack.Screen name="pastGoalsScreen" component={PastGoalsScreen} 
                options={{
                    title:'Past Goals',
                    headerStyle: headerStyles.headerStyle,
                    headerTintColor: 'white',
                    headerBackTitle: ' ',
                    }}/>
        </Stack.Navigator>
    );
};

export default ProfileStack;