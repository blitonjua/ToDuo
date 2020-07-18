import React, {useState, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  Platform,
} from 'react-native';

import {addGoalToUserGoalCollection} from '../../../services/setGoals';
import {FlatList} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserContext} from '../../../services/userContext';

//the form to add a goal and handles creating the goal.
function AddGoalScreen({route, navigation}) {
  //hooks for goal creation
  const category = route.params.category;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState('');
  const [datePicked, setDatePicked] = useState([]);
  const [datesArray, setDateArray] = useState([]);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const {user, setUser} = useContext(UserContext);

  //creates a goal and adds it to the database
  function addGoalHandler() {
    console.log(datePicked);
    addGoalToUserGoalCollection(
      user,
      title,
      description,
      milestones,
      datesArray,
      category,
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
  function addMilestone(enterText, date) {
    setMilestones(milestones.concat([enterText]));
    setDateArray(datesArray.concat([date]));
    console.log(milestones);
  }
  function onDateSelected(event, selectedDate) {
    const currentDate = selectedDate || datePicked;
    setDatePicked([
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getFullYear(),
      currentDate.valueOf(),
    ]);
    setDefaultDate(selectedDate);
    console.log(currentDate);
    // if (Platform.OS === 'android') {
    //   setShowDateTimePicker(false);
    // }
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
            renderItem={({item}) => (
              <View>
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={item => {
              item + 'x';
            }}
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
            <Button
              title="Show Calendar"
              onPress={() => setShowDateTimePicker(true)}
            />
            {showDateTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={defaultDate}
                mode="date"
                onChange={(e, d) => {
                  if (Platform.OS === 'android') {
                    setShowDateTimePicker(false);
                  }
                  onDateSelected(e, d);
                }}
              />
            )}
            <Button
              title="Add milestone"
              onPress={() => {
                if (Platform.OS === 'ios') {
                  setShowDateTimePicker(false);
                }
                addMilestone(milestoneText, datePicked);
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
          <Text>Goal Added! You can access your goal in the Goal tab.</Text>

          <TouchableOpacity onPress={() => navigation.navigate('plusScreen')}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
export default AddGoalScreen;
