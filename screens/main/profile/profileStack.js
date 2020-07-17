import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import ProfileScreen from './profileScreen';
import SettingsScreen from './settingsScreen';
import PastGoalsScreen from './pastGoalsScreen';

function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            mode='modal'
                screenOptions={{
                gestureEnabled: false,
            }}>
            <Stack.Screen name="profileScreen" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="settingsScreen" component={SettingsScreen} options={{title:'Settings'}}/>
            <Stack.Screen name="pastGoalsScreen" component={PastGoalsScreen} options={{title:'Past Goals'}}/>
        </Stack.Navigator>
    );
};

export default ProfileStack;