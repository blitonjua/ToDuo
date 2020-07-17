import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
//firebase
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../services/userContext';
//screens
import GoalStack from './goal/goalStack';
import ProfileStack from './profile/profileStack';
import AddGoalStack from './addGoal/addGoalStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MainTab() {
  const Tab = createMaterialTopTabNavigator();
  const { user, setUser } = useContext(UserContext);
  let cUser = auth().currentUser;
  if (cUser)
    setUser(cUser.uid)

  return (
    <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom" 
    tabBarOptions={{
      //labelStyle: { fontSize: 12 },
      //tabStyle: { height: 40 },
      style: { backgroundColor: '#53d681'},
      showIcon: true,
      activeTintColor: '#ffd978',
      inactiveTintColor: '#1a3d20',
      indicatorStyle: {backgroundColor: '#ffd978'},
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Profile') {
          iconName = 'ios-person';
        } else if (route.name === 'Goals') {
          iconName = 'ios-disc';
        } else if (route.name === 'New'){
          iconName = 'ios-add-circle-outline';
        }

        return <Ionicons name={iconName} size={25} color={color} />;
      },
    })}
    >
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Goals" component={GoalStack} />
      <Tab.Screen name="New" component={AddGoalStack} />
    </Tab.Navigator>
  );
}

export default MainTab;
