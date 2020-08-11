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
<<<<<<< HEAD
            <Stack.Screen name="profileScreen" component={ProfileScreen} />
            <Stack.Screen name="settingsStack" component={SettingsScreen} />
            <Stack.Screen name="pastGoalsScreen" component={PastGoalsScreen} />
=======
            <Stack.Screen name="profileScreen" component={ProfileScreen} 
                options={{headerShown: false}}/>
            <Stack.Screen name="settingsScreen" component={SettingsScreen} 
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
>>>>>>> 85783bd01ad80544b069a8f8ad1490a352d8392e
        </Stack.Navigator>
    );
};

export default ProfileStack;