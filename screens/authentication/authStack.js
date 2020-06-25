import React from 'react';
import { StyleSheet } from 'react-native';
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

export const authStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  padding: {
    padding: 20
  },
  textInput: {
    fontWeight: '100',
    fontSize: 16,
    fontFamily: 'BloggerSans-Medium'
  },
  title: {
    fontSize: 60,
    textAlign: 'left',
    fontFamily: 'BloggerSans-BoldItalic'
  },
  container: {
    backgroundColor: 'white',
    padding: 7,
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderColor: '#EBEBEB',
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  //buttons--------------------
  buttonView: {
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  //links----------------------
  linkView: {
    alignItems: 'center',
    marginTop: 10
  },
});

export default AuthStack;
