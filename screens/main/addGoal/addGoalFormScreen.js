import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {addGoalToUserGoalCollection} from '../../../services/createGoal';

function AddGoalFormScreen({navigation}) {
  //navigates back to Plus
  function goBack() {
    navigation.navigate('Plus');
  }
  // listOutDatabase();
  const addGoalHandler = title => {
    //some stuff
  };

  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [milestone, setMilestones] = useState('');

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>Go Back because you don't know what your goal is lame-o</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addGoalHandler()}>
        <Text>Add Goal</Text>
      </TouchableOpacity>

      <View style={{borderWidth: 1}}>
        <TextInput
          placeholder="Enter Title"
          onChangeText={text => setTitle(text)}
          //   value={goal}
        />
      </View>
      <View style={{borderWidth: 1}}>
        <TextInput
          placeholder="Enter Description"
          onChangeText={text => setDesc(text)}
          //   value={goal}
        />
      </View>

      {/* this textInput would be a dinamic one, so the more weeks, the more milestones */}
      <View style={{borderWidth: 1}}>
        <TextInput
          placeholder="Enter milestones"
          onChangeText={text => setMilestones(text)}
          //   value={goal}
        />
      </View>

      {/* <Text>{goal}</Text> */}
      <Button
        title="+"
        onPress={() => {
          //change static values for title, description and milestones
          addGoalToUserGoalCollection(
            auth().currentUser.uid,
            title,
            description,
            [milestone],
          );
        }}
      />
    </SafeAreaView>
  );
}

export default AddGoalFormScreen;
