import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import AddGoalScreen from "./addGoalScreen";
import PlusScreen from './plusScreen';
import CategoryScreen from './categoryScreen';

const Stack = createStackNavigator();

function AddGoalStack() {
  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="Plus" component={PlusScreen} />
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="Add Goals" component={AddGoalScreen} />
      {/* todo: other screens on add goal go here */}
    </Stack.Navigator>
  );
}

export default AddGoalStack;