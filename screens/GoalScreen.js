import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
  } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Goals from "./goals";
import AddGoals from "./addGoals"




const Stack = createStackNavigator();

function GoalScreen() {
    return (
        <Stack.Navigator
          mode='modal'
          headerMode='none'
          screenOptions={{
            gestureEnabled: false
          }} >
          <Stack.Screen name="Goals" component={Goals} />
          <Stack.Screen name="Add Goals" component={AddGoals} />
        </Stack.Navigator>
      );
}

export default GoalScreen;