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
import {toDoStyles} from '../../../assets/styles/styles';
function ToDoListSceen({route, navigation}) {
  const {goal} = route.params;
  const [toDoList, setToDoList] = useState([]);
  const [toDoText, setToDoText] = useState('');
  const styles = toDoStyles;

  let uid = auth().currentUser.uid;
  //get to do list
  async function getToDoListData() {
    let data = await getToDoList(uid, goal.goalId);
    setToDoList(data);
  }
  getToDoListData();
  return (
    <SafeAreaView style={styles.safe}>
      {/* todo list */}
      <View style={styles.main}>
        <FlatList
          data={toDoList}
          renderItem={({item}) => (
            //TODO: preferable to move this into a separate function
            <View style={styles.toDoItem}>
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
            style={{color: 'white'}}
            placeholder="Add item to do list"
            placeholderTextColor='gray'
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
    </SafeAreaView>
  );
}

export default ToDoListSceen;
