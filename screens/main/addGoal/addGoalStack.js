import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import AddGoalScreen from "./addGoalScreen";
import PlusScreen from './plusScreen';
import CategoryScreen from './categoryScreen';

const Stack = createStackNavigator();

//stack navigator for addGoals
function AddGoalStack() {
  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="plusScreen" component={PlusScreen} />
      <Stack.Screen name="categoryScreen" component={CategoryScreen} />
      <Stack.Screen name="addGoalScreen" component={AddGoalScreen} />
    </Stack.Navigator>
  );
}

export default AddGoalStack;