import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import listOutDatabase from '../services/fire';
// import matchUser from '../services/fire';
import {matchUser, addUser, listOutDatabase} from '../services/fire';

const Welcome = props => {
  // var firstName=,lastName=,age=, email=,goals=;
  const signOut = () => {
    auth().signOut();
  };
  // listOutDatabase();
  const addGoalHandler = title => {
    //some stuff
  };

  const [goal, setGoal] = useState('');

  const onChangeTextHandler = enteredGoal => {
    //some stuff
    setGoal(enteredGoal);
  };

  return (
    <View>
      <Text>uid:{props.uid}</Text>
      <Button
        title="Sign out "
        onPress={() => {
          signOut();
        }}
      />
      <TouchableOpacity onPress={() => addGoalHandler()}>
        <Text>Add Goal</Text>
      </TouchableOpacity>
      <TextInput onChangeText={() => onChangeTextHandler()} value={goal} />
      <Text>{goal}</Text>

      <View>
        {/* change the 'tempid' to goal id */}
        <Button
          title="add a goal to waiting room"
          onPress={() => {
            //pass in goal id, this is where we connect to Andrea
            matchUser('tempId0');
          }}
        />
      </View>
    </View>
  );
};
export default Welcome;
