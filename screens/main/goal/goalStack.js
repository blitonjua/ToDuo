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
  //read how many goals the user has from goals collection
  let uid = auth().currentUser.uid;
  let [length, goalData] = getGoalData(uid);
  // console.log(length);
  // console.log(goalData);
  //create a loop that adds an element to an array of goals (title, desc, etc..)

  //return the flatlist with a stack.screen for each elemetn in the arr

  return (
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
  );
}
export default GoalStack;
