import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
//firebase
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../services/userContext';
//screens
import GoalStack from './goal/goalStack';
import ProfileStack from './profile/profileStack';
import AddGoalStack from './addGoal/addGoalStack';

const Tab = createMaterialTopTabNavigator();

function MainTab() {
  const { user, setUser } = useContext(UserContext);
  let cUser = auth().currentUser;
  if (cUser)
    setUser(cUser.uid)

  return (
    <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom">
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Goal" component={GoalStack} />
      <Tab.Screen name="New" component={AddGoalStack} />
    </Tab.Navigator>
  );
}

export default MainTab;
