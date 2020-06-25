import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import LoginScreen from './loginScreen';
import SignupScreen from './signupScreen';

const Stack = createStackNavigator();

function AuthStack() {

  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
