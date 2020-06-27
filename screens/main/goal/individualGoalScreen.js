import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
// import getGoalData from '../../../services/getData';
import {FlatList} from 'react-native-gesture-handler';
import {addToDo} from '../../../services/toDoList';
import {getToDoList} from '../../../services/toDoList';
import {deleteItem} from '../../../services/toDoList';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';

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

  setToDo();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <Text style={styles.title}>{goal.title}</Text>
        <Text>{goal.description}</Text>
        <Button title="Messages" onPress={() => gotoMessage()} />
        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
          <FlatList
            data={goal.milestones}
            renderItem={({item}) => (
              <View style={styles.goalContainerTwo}>
                <Text style={styles.goalText}>{item}</Text>
                <Text>Due Date</Text>
              </View>
            )}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  main: {
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 1,
  },
  milestonesText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  flatListContainer: {
    marginTop: 10,
  },
  goalContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  goalContainerTwo: {
    backgroundColor: 'white',
    padding: 7,
    marginTop: 10,
    marginRight: 0.5,
    marginLeft: 0.5,
    marginBottom: 1,
    alignItems: 'stretch',
    borderColor: '#EBEBEB',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  toDoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default individualGoalScreen;
