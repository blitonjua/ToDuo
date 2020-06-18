import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { matchUser } from '../../services/fire';
import {addGoalToUserGoalCollection} from '../../services/createGoal';

function GoalScreen() {
  return (
    <SafeAreaView>
      <Button
        title="add a goal to waiting room"
        onPress={() => {
          //pass in goal id, this is where we connect to Andrea
          matchUser('tempId3');
        }}
      />

      <Button
        title="+"
        onPress={() => {
          //change static values for title, description and milestones
          addGoalToUserGoalCollection(
            auth().currentUser.uid,
            'title',
            'description',
            ['milestone1', 'milestone2', 'milestone3'],
          );
        }}
      />
    </SafeAreaView>
  );
};
export default GoalScreen;
