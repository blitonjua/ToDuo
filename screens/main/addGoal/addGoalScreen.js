import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import AddGoalFormScreen from "./addGoalFormScreen";
import PlusScreen from './plusScreen';

const Stack = createStackNavigator();

function GoalScreen() {
  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false
      }} >
      <Stack.Screen name="Plus" component={PlusScreen} />
      <Stack.Screen name="Add Goals" component={AddGoalFormScreen} />
      {/* todo: other screens on add goal go here */}
    </Stack.Navigator>
  );
}

export default GoalScreen;