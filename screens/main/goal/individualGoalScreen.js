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
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
//firebase
import auth from '@react-native-firebase/auth';
import {addToDo} from '../../../services/toDoList';
import {getToDoList} from '../../../services/toDoList';
import {deleteItem} from '../../../services/toDoList';
//styles
import { individualGoalStyles } from '../../../assets/styles/styles';
const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function individualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  let uid = auth().currentUser.uid;

  function gotoMessage() {
    navigation.navigate('Message');
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

  //list item renderer
  function ListItem({ item }) {
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
            renderItem={({ item }) => <ListItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.main}>
          <Text>To Do</Text>
          <FlatList
            data={toDoList}
            renderItem={({item}) => (
              <View style={styles.toDoItem}>
                <CircleCheckBox
                  checked={false}
                  onToggle={checked => {
                    let itemId = item.itemDescription;
                    deleteItem(uid, goal.goalId, itemId);
                  }}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label={item.itemDescription}
                />
              </View>
            )}
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
      <Button title='msg' onPress={() => {navigation.navigate('messageScreen', {goal: route})}}/>
    </SafeAreaView>
  );
}

export default individualGoalScreen;
