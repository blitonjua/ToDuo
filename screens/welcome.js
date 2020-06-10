import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import readFromDatabase from '../services/fire';
import listOutDatabase from "../services/fire";

const Welcome = props => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => listOutDatabase); // TODO why this pops up when we sign in rather than sign out????
  };

  const addGoalHandler = (title) => {
    //some stuff
  };

  const [goal, setGoal] = useState("");

  const onChangeTextHandler = (enteredGoal) => {
    //some stuff
    setGoal(enteredGoal);
  };

  return (
    <View>
      <Text>Welcome!</Text>
      <Button
        title="Sign out "
        onPress={() => {
          signOut();
        }}
      />
      <TouchableOpacity onPress={() => addGoalHandler()}>
        <Text>Add Goal</Text>
      </TouchableOpacity>
      <TextInput onChangeText={() => onChangeTextHandler()} value={goal}/>
      <Text>{goal}</Text>
    </View>
  );
};
export default Welcome;
