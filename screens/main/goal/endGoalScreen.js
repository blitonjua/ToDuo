import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import {updateStatus, bailPartnership} from '../../../services/setGoals';
//constants
import {status} from '../../../services/universalConstants';
//styles
import {individualGoalStyles} from '../../../assets/styles/styles';

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';

import {UserContext} from '../../../services/userContext';

import {requestMilestoneCompletion} from '../../../services/getMilestoneData';

//components
import MileStoneList from './milestoneList';
import firestore from '@react-native-firebase/firestore';

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function EndGoalScreen({route, navigation}) {
  const {goal} = route.params;

  // console.log(goal);
  let uid = auth().currentUser.uid;

  // let user = auth().currentUser.uid;
  const {user, setUser} = useContext(UserContext);

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(user, goal.goalId, status);
    navigation.navigate('doneScreen', {status: status});
  }
  
  //bails the user out of the partnership
  function bail() {
    navigation.goBack();
    bailPartnership(user, goal);
  }
  // console.log(goal);
  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <View style={styles.padding}>
        {/* overview info */}
      </View>
      <ScrollView>
        {/* complete goal */}
        <Button title="complete" onPress={() => goalDone(status.completed)} />
        {/* archive goal */}
        <Button title="archive" onPress={() => goalDone(status.archived)} />
        {/* accountabuddy bail */}
        <Button title="bail buddy" onPress={() => bail()} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EndGoalScreen;
