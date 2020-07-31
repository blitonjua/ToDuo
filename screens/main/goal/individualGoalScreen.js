import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import { updateStatus, bailPartnership } from '../../../services/setGoals';
//constants
import {status} from '../../../services/universalConstants';
//styles
import {individualGoalStyles} from '../../../assets/styles/styles';
import {getMilestonesAsObjects} from '../../../services/getMilestoneData';

import {UserContext} from '../../../services/userContext';
import firestore from '@react-native-firebase/firestore';

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [milestones, setMilestones] = useState([]);
  const [buddyName, setBuddyName] = useState('');

  useEffect(()=>{
    firestore().collection("Users").doc(goal.accountaBuddyId).get().then((docSnap) => {
      setBuddyName(docSnap.data().firstName);
      console.log('this alot?');
    });
  }, []);

  let uid = auth().currentUser.uid;

  // let user = auth().currentUser.uid;
  const {user, setUser} = useContext(UserContext);

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(user, goal.goalId, status);
    navigation.navigate('doneScreen', {status: status});
  }

  function gotoMessage() {
    navigation.navigate('messageScreen', {goal: route});
  }

  async function getMilestones() {
    let data = await getMilestonesAsObjects(uid, goal.goalId);
    setMilestones(data);
  }
  getMilestones();
  function MilestoneListItem({item}) {
    return (
      <View style={styles.goalContainerTwo}>
        <Text style={styles.goalText}>{item.milestoneText}</Text>
        <Text style={styles.goalText}>
          due: {item.milestoneMonth}/{item.milestoneDay}/
          {item.milestoneFullYear}
        </Text>
      </View>
    );
  }

  //bails the user out of the partnership
  function bail() {
    navigation.goBack();
    bailPartnership(user, goal);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* messages button */}
      <View style={styles.padding}>
        <TouchableOpacity style={styles.wideButton} onPress={() => gotoMessage()}>
          <Text>{'Message ' + buddyName}</Text>
        </TouchableOpacity>
      </View>
      {/* toDo list button */}
      <Button
        title="to-do list"
        color='#53d681'
        onPress={() => {
          navigation.navigate('toDoListScreen', {goal: goal});
        }}
      />

      {/* milestones */}
      <View style={styles.padding}> 
        <View style={styles.flatListContainer}>
          <View style={styles.listTitle}>
          <Text style={styles.milestonesText}>Milestones</Text>
          </View>
          <FlatList
            data={goal.milestones}
            renderItem={({ item }) => <MilestoneListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      {/* archive goal */}
      <Button
        color='#53d681'
        title='archive'
        onPress={() => goalDone(status.archived)}
      />

      {/* complete goal */}
      <Button
        color='#53d681'
        title='complete'
        onPress={() => goalDone(status.completed)}
      />

      {/* accountabuddy bail */}
      <Button
        color='#53d681'
        title='bail buddy'
        onPress={() => bail()}
      />
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
