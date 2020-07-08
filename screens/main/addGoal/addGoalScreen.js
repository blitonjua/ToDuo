import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  // FlatList,
} from 'react-native';

//firebase
import auth from '@react-native-firebase/auth';
import {addGoalToUserGoalCollection} from '../../../services/createGoal';
import {FlatList} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

//the form to add a goal and handles creating the goal.
function AddGoalScreen({navigation}) {
  //hooks for goal creation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState('');
  const [datePicked, setDatePicked] = useState('');
  //creates a goal and adds it to the database
  function addGoalHandler() {
    console.log(milestones);
    addGoalToUserGoalCollection(
      auth().currentUser.uid,
      title,
      description,
      milestones,
    );
    setSubmitted(true);
  }

  //sets title
  function titleHandler(enteredTitle) {
    setTitle(enteredTitle);
  }

  //sets description
  function descriptionHandler(enteredDescription) {
    setDescription(enteredDescription);
  }

  //add a milestone to array
  function addMilestone(enterText) {
    setMilestones(milestones.concat([enterText]));
  }

  function onDataSelected(event, selectedDate) {
    const currentDate = selectedDate || datePicked;
    setDatePicked(currentDate);
    console.log(currentDate);
  }
  return (
    <SafeAreaView>
      {!submitted ? (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back because you don't know what your goal is lame-o</Text>
          </TouchableOpacity>
          <View>
            {/* title */}
            <View style={{borderWidth: 1}}>
              <TextInput
                placeholder="title"
                onChangeText={titleHandler}
                value={title}
              />
            </View>

            {/* description */}
            <View style={{borderWidth: 1}}>
              <TextInput
                placeholder="description"
                onChangeText={descriptionHandler}
                value={description}
              />
            </View>
          </View>
          {/* Display milestones added */}
          <FlatList
            data={milestones}
            renderItem={({item}) => <Text>{item}</Text>}
          />
          {/* adding a new milestone */}
          <View style={{borderWidth: 1, backgroundColor: 'pink'}}>
            <TextInput
              placeholder="add milestone"
              onChangeText={text => setMilestoneText(text)}
              ref={input => {
                this.myTextInput = input;
              }}
            />
            {milestoneText !== '' && (
              <DateTimePicker
                placeholder="Choose a deadline"
                testID="dateTimePicker"
                value={new Date(1598051730000)}
                mode={'date'}
                is24Hour={true}
                display="display"
                format="DD/MM/YYYY"
                onChange={onDataSelected}
              />
            )}
            <Button
              title="+"
              onPress={() => {
                console.log('picked' + datePicked);
                addMilestone(milestoneText);
                setMilestoneText('');
                this.myTextInput.clear();
              }}
            />
          </View>

          {/* add goal Button */}
          <Button
            title="create "
            onPress={() => {
              addGoalHandler();
            }}
          />
        </View>
      ) : (
        //renders on successfully adding goal
        <View>
          <Text>Goal Added! This will be some confirmation text.</Text>

          <TouchableOpacity onPress={() => navigation.navigate('plusScreen')}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default AddGoalScreen;
