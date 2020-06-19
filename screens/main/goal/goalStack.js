import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//custom screens
import DashboardScreen from './dashboardScreen';
import MessageScreen from './messageScreen';
import ApproveScreen from './approveScreen';

const Stack = createStackNavigator();

function GoalStack() {
  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        gestureEnabled: false
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Approve" component={ApproveScreen} />
    </Stack.Navigator>
  );
};
export default GoalStack;
