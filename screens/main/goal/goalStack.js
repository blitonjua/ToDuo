import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import GoalsListScreen from './goalsListScreen';
import MessageScreen from './messageScreen';
import DoneScreen from './doneScreen';
import IndividualGoalDisplay from './individualGoalDisplay';
import EndGoalScreen from './endGoalScreen';

//header style
import {headerStyles} from '../../../assets/styles/styles';
import ToDoListScreen from './toDoListScreen';
import ApproveMilestone from './approveMilestones';

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
      <Stack.Screen name="individualGoalDisplay" 
          component={IndividualGoalDisplay}
          options={({ route }) => ({
            title: route.params.goal.title,
            headerStyle: headerStyles.headerStyle,
            headerTintColor: 'white',
            headerBackTitle: ' ',
          })}
          />
      <Stack.Screen name="messageScreen" component={MessageScreen}
        options={({ route }) => ({
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',
      })}/>
      <Stack.Screen name="doneScreen" component={DoneScreen} options={{headerShown: false}}/>
      <Stack.Screen name="toDoListScreen" component={ToDoListScreen} 
      options={({ route }) => ({
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',
        title: 'To-do',
      })}/>
      <Stack.Screen name="approveMilestones" component={ApproveMilestone} 
      options={({ route }) => ({
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',
        title: 'Approve Milestones',
      })}/>
      <Stack.Screen name="endGoalScreen" component={EndGoalScreen}
      options={({ route }) => ({
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',
        title: 'End Goal',
      })}/>
    </Stack.Navigator>
  );
}
export default GoalStack;
