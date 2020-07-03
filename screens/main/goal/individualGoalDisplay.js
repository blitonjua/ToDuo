import React from 'react';
//screens
import IndividualGoalScreen from './individualGoalScreen';
import SearchingScreen from './searchingScreen';


//displays the correct goal screen depending on which stage the goal is on.
function IndividualGoalDisplay({ route, navigation }) {
    const { goal } = route.params;

    //if there's a match
    if (goal.accountabuddyId) {
        return (
            <IndividualGoalScreen navigation={navigation} route={route} />
        )
    }
    //if there's no match
    return (
        <SearchingScreen navigation={navigation} />
    )
}

export default IndividualGoalDisplay;