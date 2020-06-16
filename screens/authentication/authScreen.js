import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import LoginScreen from './loginScreen';
import SignupScreen from './signupScreen';

const Stack = createStackNavigator();

function AuthScreen() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthScreen;
