import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

//custom screens 
import GoalScreen from "./goalScreen";
import ProfileScreen from './profileScreen';
import AddGoalScreen from './addGoal/addGoalScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom">
            <Tab.Screen name ="Settings" component={ProfileScreen}/>
            <Tab.Screen name ="Goal" component={GoalScreen}/>
            <Tab.Screen name ="+" component={AddGoalScreen}/>
        </Tab.Navigator>
    )
}

export default MyTabs;