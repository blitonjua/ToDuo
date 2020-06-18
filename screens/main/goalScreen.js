import React, {useState} from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { matchUser } from '../../services/fire';
import {addGoalToUserGoalCollection} from '../../services/createGoal';

function GoalScreen() {
  return (
    <SafeAreaView>
      <Text>Hi</Text>
    </SafeAreaView>
  );
};
export default GoalScreen;
