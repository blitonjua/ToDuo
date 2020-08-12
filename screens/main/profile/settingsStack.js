import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SettingsScreen from './settingsScreen';
import DeactivationScreen from './DeactivationScreen';
import changeProfilePicture from './changeProfilePicture';



function settingsStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            mode='modal'
                screenOptions={{
                gestureEnabled: false,
            }}>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} 
                options={{headerShown: false}}/>
            <Stack.Screen name="changeProfilePicture" component={changeProfilePicture} 
                />
            <Stack.Screen name="DeactivationScreen" component={DeactivationScreen} 
                />
        </Stack.Navigator>
    );
};

export default settingsStack;