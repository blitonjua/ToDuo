import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
//firebase
import auth from '@react-native-firebase/auth';
import {addToDo, getToDoList, deleteItem} from '../../../services/toDoList';
import {updateStatus} from '../../../services/setGoals';
//constants
import {status} from '../../../services/universalConstants';
//styles
import {individualGoalStyles} from '../../../assets/styles/styles';
import {getMilestonesAsObjects} from '../../../services/getData';

import {UserContext} from '../../../services/userContext';
const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  const [milestones, setMilestones] = useState([]);

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
        <Text>
          due: {item.milestoneMonth}/{item.milestoneDay}/
          {item.milestoneFullYear}
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>GO BACK</Text>
      </TouchableOpacity>

      <View style={styles.padding}>
        {/* overview info */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text>{goal.description}</Text>

        {/* milestones */}
        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
          <FlatList
            data={milestones}
            renderItem={({item}) => <MilestoneListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      {/* toDo list button */}
      <Button
        title="to-do list"
        onPress={() => {
          navigation.navigate('toDoListScreen', {goal: goal});
        }}
      />

      {/* messages button */}
      <Button title="msg" onPress={() => gotoMessage()} />

      {/* archive goal */}
      <Button title="archive" onPress={() => goalDone(status.archived)} />

      {/* complete goal */}
      <Button title="complete" onPress={() => goalDone(status.completed)} />
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
