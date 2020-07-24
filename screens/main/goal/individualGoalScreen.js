import React, { useState, useContext } from 'react';
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
import { UserContext } from '../../../services/userContext';
const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({ route, navigation }) {
  const { goal } = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  // let user = auth().currentUser.uid;
  const { user, setUser } = useContext(UserContext)

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(user ,goal.goalId, status);
    navigation.navigate('doneScreen', { status: status })
  }

  function gotoMessage() {
    navigation.navigate('messageScreen', { goal: route });
  }

  async function getToDoListData() {
    let data = await getToDoList(user, goal.goalId);
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
        <Text style={styles.goalText}>Due Date</Text>
      </View>
    )
  }

  setToDo();
  return (
    <SafeAreaView style={styles.safe}>
      {/* messages button */}
      <View style={styles.padding}>
        <TouchableOpacity style={styles.wideButton} onPress={() => gotoMessage()}>
          <Text>Message Buddy (TODO put name here later)</Text>
        </TouchableOpacity>
      </View>

      {/* overview info */}
      <View style={styles.padding}>
        <View style={styles.listTitle}>
          <Text style={styles.milestonesText}>To Do</Text>
          </View>
          <FlatList
            data={toDoList}
            renderItem={({ item }) =>
              //TODO: preferable to move this into a separate function
              <View>
                <CircleCheckBox
                  styleLabel={{color: 'white'}}
                  outerSize={15}
                  innerColor={'#272b28'}
                  outerColor={'#53d681'}
                  filterColor={'#272b28'}
                  styleCheckboxContainer={{flex: 1}}
                  checked={false}
                  onToggle={() => {
                    let itemId = item.itemDescription;
                    deleteItem(user, goal.goalId, itemId);
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
              placeholderTextColor='gray'
              style={{color: 'white', flex: 1}}
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
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
