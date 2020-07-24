import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import AddGoalScreen from "./addGoalScreen";
import PlusScreen from './plusScreen';
import CategoryScreen from './categoryScreen';
import {headerStyles} from '../../../assets/styles/styles';

const Stack = createStackNavigator();

//stack navigator for addGoals
function AddGoalStack() {
  return (
    <Stack.Navigator
      mode='modal'
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="plusScreen" component={PlusScreen} options={{headerShown: false}}/>
      <Stack.Screen name="categoryScreen" component={CategoryScreen} options={{
        title:'Categories',
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',
        }}/>
      <Stack.Screen name="addGoalScreen" component={AddGoalScreen} options={{
        title:'Add a new goal',
        headerStyle: headerStyles.headerStyle,
        headerTintColor: 'white',
        headerBackTitle: ' ',}}/>
    </Stack.Navigator>
  );
}

export default AddGoalStack;