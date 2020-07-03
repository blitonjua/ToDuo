import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
//firebase
import auth from '@react-native-firebase/auth';
import { addToDo, getToDoList, deleteItem } from '../../../services/toDoList';
import { updateStatus } from '../../../services/setGoals';
//constants
import { status } from '../../../services/universalConstants';
//styles
import { individualGoalStyles } from '../../../assets/styles/styles';
const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({ route, navigation }) {
  const { goal } = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  let uid = auth().currentUser.uid;

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(uid, goal.goalId, status);
    navigation.navigate('doneScreen', { status: status})
  }

  function gotoMessage() {
    navigation.navigate('messageScreen', { goal: route });
  }

  async function getToDoListData() {
    let data = await getToDoList(uid, goal.goalId);
    return data;
  }

  function setToDo() {
    getToDoListData().then(function (items) {
      setToDoList(items);
    });
  }

  //milestone list item renderer
  function MilestoneListItem({ item }) {
    return (
      <View style={styles.goalContainerTwo}>
        <Text style={styles.goalText}>{item}</Text>
        <Text>Due Date</Text>
      </View>
    )
  }

  setToDo();
  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>
          GO BACK
        </Text>
      </TouchableOpacity>

      <View style={styles.padding}>
        {/* overview info */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text>
          {goal.description}
        </Text>

        {/* milestones */}
        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
          <FlatList
            data={goal.milestones}
            renderItem={({ item }) => <MilestoneListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* todo list */}
        <View style={styles.main}>
          <Text>To Do</Text>
          <FlatList
            data={toDoList}
            renderItem={({ item }) =>
              //TODO: preferable to move this into a separate function
              <View style={styles.toDoItem}>
                <CircleCheckBox
                  checked={false}
                  onToggle={() => {
                    let itemId = item.itemDescription;
                    deleteItem(uid, goal.goalId, itemId);
                  }}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label={item.itemDescription}
                />
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.toDoItem}>
            <TextInput
              placeholder="Add item to do list"
              onChangeText={text => setToDoText(text)}
              ref={input => {
                this.textInput = input;
              }}
            />
            <Button
              title="+"
              onPress={() => {
                if (toDoText != '') {
                  addToDo(auth().currentUser.uid, goal.goalId, toDoText);
                  setToDoText('');
                  this.textInput.clear();
                }
              }}
            />
          </View>
        </View>
      </View>

      {/* messages button */}
      <Button
        title='msg'
        onPress={() => gotoMessage()}
      />

      {/* archive goal */}
      <Button
        title='archive'
        onPress={() => goalDone(status.archived)}
      />

      {/* complete goal */}
      <Button
        title='complete'
        onPress={() => goalDone(status.completed)}
      />
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
