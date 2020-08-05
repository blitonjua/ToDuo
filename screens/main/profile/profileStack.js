import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import ProfileScreen from './profileScreen';
import settingsStack from './settingsStack';
import PastGoalsScreen from './pastGoalsScreen';

function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            mode='modal'
            headerMode='none'
            screenOptions={{
                gestureEnabled: false
            }}>
            <Stack.Screen name="profileScreen" component={ProfileScreen} />
            <Stack.Screen name="settingsStack" component={SettingsScreen} />
            <Stack.Screen name="pastGoalsScreen" component={PastGoalsScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;