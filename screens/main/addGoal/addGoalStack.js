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
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="plusScreen" component={PlusScreen} options={{headerShown: false}}/>
      <Stack.Screen name="categoryScreen" component={CategoryScreen} options={{title:'Categories'}}/>
      <Stack.Screen name="addGoalScreen" component={AddGoalScreen} options={{title:'Add a new goal'}}/>
    </Stack.Navigator>
  );
}

export default AddGoalStack;