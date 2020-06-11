import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import getData from '../services/fire';
import listOutDatabase from '../services/fire';

const Welcome = props => {
  // var firstName=,lastName=,age=, email=,goals=;
  const signOut = () => {
    auth().signOut(); // TODO why this pops up when we sign in rather than sign out????
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
    </View>
  );
};
export default Welcome;
