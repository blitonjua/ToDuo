import React, {useState} from 'react';
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
//styles
import {individualGoalStyles} from '../../../assets/styles/styles';
import {getMilestonesAsObjects} from '../../../services/getData';

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function individualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  const [milestones, setMilestones] = useState([]);

  let uid = auth().currentUser.uid;

  function gotoMessage() {
    navigation.navigate('messageScreen', {goal: route});
  }

  function gotoApprove() {
    navigation.navigate('Approve');
  }

  async function getToDoListData() {
    let data = await getToDoList(uid, goal.goalId);
    return data;
  }

  function setToDo() {
    getToDoListData().then(function(items) {
      setToDoList(items);
    });
  }

  //milestone list item renderer
  function MilestoneListItem({item}) {
    return (
      <View style={styles.goalContainerTwo}>
        <Text style={styles.goalText}>{item.milestoneText}</Text>
        <Text>{item.milestoneDeadline}</Text>
        <Text>status{item.milestoneStatus}</Text>
      </View>
    );
  }

  async function getMilestones() {
    let data = await getMilestonesAsObjects(uid, goal.goalId);
    return data;
  }
  function getMilestoneData() {
    getMilestones().then(function(val) {
      setMilestones(val);
    });
  }
  getMilestoneData();
  setToDo();
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

        {/* todo list */}
        <View style={styles.main}>
          <Text>To Do</Text>
          <FlatList
            data={toDoList}
            renderItem={({item}) => (
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
            )}
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
      <Button title="msg" onPress={() => gotoMessage()} />
    </SafeAreaView>
  );
}

export default individualGoalScreen;
