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
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen name="goalsListScreen" component={GoalsListScreen} options={{headerShown: false}}/>
      <Stack.Screen name="individualGoalDisplay" component={IndividualGoalDisplay} options={{title:'TODO goal title here'}}/>
      <Stack.Screen name="messageScreen" component={MessageScreen} options={{title:'TODO chat buddy\'s first name'}}/>
      <Stack.Screen name="doneScreen" component={DoneScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
export default GoalStack;
