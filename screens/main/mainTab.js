import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
//firebase
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../services/userContext';
//screens
import GoalStack from './goal/goalStack';
import ProfileStack from './profile/profileStack';
import AddGoalStack from './addGoal/addGoalStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

function MainTab() {
  const { user, setUser } = useContext(UserContext);
  let cUser = auth().currentUser;
  if (cUser)
    setUser(cUser.uid)

  return (
    <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'New'){
          iconName = focused? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Goal" component={GoalStack} />
      <Tab.Screen name="New" component={AddGoalStack} />
    </Tab.Navigator>
  );
}

export default MainTab;
