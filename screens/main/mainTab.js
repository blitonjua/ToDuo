import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

//custom screens 
import GoalScreen from './goalScreen';
import ProfileStack from './profile/profileStack';
import AddGoalStack from './addGoal/addGoalStack';

const Tab = createMaterialTopTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator initialRouteName="Goal" tabBarPosition="bottom">
            <Tab.Screen name ="Profile" component={ProfileStack}/>
            <Tab.Screen name ="Goal" component={GoalScreen}/>
            <Tab.Screen name ="+" component={AddGoalStack}/>
        </Tab.Navigator>
    )
}

export default MainTab;