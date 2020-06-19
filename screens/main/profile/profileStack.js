import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import ProfileScreen from './profileScreen';
import SettingsScreen from './settingsScreen';

function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            mode='modal'
            headerMode='none'
            screenOptions={{
                gestureEnabled: false
            }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;