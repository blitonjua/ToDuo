import React from 'react';
//screens
import IndividualGoalScreen from './individualGoalScreen';
import SearchingScreen from './searchingScreen';
//constants
import { status } from '../../../services/universalConstants';


//displays the correct goal screen depending on which stage the goal is on.
function IndividualGoalDisplay({ route, navigation }) {
    const { goal } = route.params;
    console.log(goal.status, status.inProgress, status.matching)
    //if there's a match
    if (goal.status == status.inProgress) {
        return (
            <IndividualGoalScreen navigation={navigation} route={route} />
        )
    }
    //if there's no match
    if (goal.status == status.matching){
        return (
            <SearchingScreen navigation={navigation} />
        )
    }
    return null;
}

export default IndividualGoalDisplay;