import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import GoalsListScreen from './goalsListScreen';
import MessageScreen from './messageScreen';
import DoneScreen from './doneScreen';
import IndividualGoalDisplay from './individualGoalDisplay';

const Stack = createStackNavigator();

//the stack navigator of the goals stack where users can access existing goals.
function GoalStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen name="goalsListScreen" component={GoalsListScreen} />
      <Stack.Screen name="individualGoalDisplay" component={IndividualGoalDisplay} />
      <Stack.Screen name="messageScreen" component={MessageScreen} />
      <Stack.Screen name="doneScreen" component={DoneScreen} />
    </Stack.Navigator>
  );
}
export default GoalStack;
