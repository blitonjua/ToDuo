import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//custom screens
import DashboardScreen from './dashboardScreen';
import MessageScreen from './messageScreen';
import ApproveScreen from './approveScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {LongPressGestureHandler} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function GoalStack() {
  // display buttons/ list items that user can click for each of their goals

  //once its clicked, expands into the dashboard

  //read how many goals the user has from goals collection

  //create a loop that adds an element to an array of goals (title, desc, etc..)

  //return the flatlist with a stack.screen for each elemetn in the arr

  return (
    <Stack.Navigator>
      <Stack.Screen name="listOfGoals" />
      <Stack.Screen name="dashBoard" />
    </Stack.Navigator>
    /*
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Approve" component={ApproveScreen} />
    </Stack.Navigator>
    //*/
  );
}
export default GoalStack;
