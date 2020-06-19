import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

//custom screens 
import GoalStack from './goal/goalStack';
import ProfileStack from './profile/profileStack';
import AddGoalStack from './addGoal/addGoalStack';

const Tab = createMaterialTopTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom">
            <Tab.Screen name ="Profile" component={ProfileStack}/>
            <Tab.Screen name ="Goal" component={GoalStack}/>
            <Tab.Screen name ="New" component={AddGoalStack}/>
        </Tab.Navigator>
    )
}

export default MainTab;