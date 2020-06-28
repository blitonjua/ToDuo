import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//custom screens
import individualGoalScreen from './individualGoalScreen';
import goalsListScreen from './goalsList';
import ApproveScreen from './approveScreen';
import MessageScreen from './messageScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {LongPressGestureHandler} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function GoalStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen name="listOfGoals" component={goalsListScreen} />
      <Stack.Screen name="individualGoalScreen" component={individualGoalScreen} />
      <Stack.Screen name="messageScreen" component={MessageScreen} />
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
