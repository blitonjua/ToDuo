import React, { useState, useContext } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  Platform,
} from 'react-native';

import { addGoalToUserGoalCollection } from '../../../services/setGoals';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../../services/userContext';
import { appStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//the form to add a goal and handles creating the goal.
function AddGoalScreen({ route, navigation }) {
  //hooks for goal creation
  const category = route.params.category;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  //milestones
  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState('');
  const [datePicked, setDatePicked] = useState([]);
  const [datesArray, setDateArray] = useState([]);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  //validation
  const [validDate, setValidDate] = useState(false);
  const [validTitle, setValidTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [milestoneErrorMessage, setMilestoneErrorMessage] = useState('');

  const { user, setUser } = useContext(UserContext);

  //creates a goal and adds it to the database
  function addGoalHandler() {
    if (!validTitle)
      setErrorMessage('Please enter a title.');
    else if (!validDescription)
      setErrorMessage('Please enter a description');
    else if (milestones.length == 0)
      setErrorMessage('Please enter at least 1 milestone.');
    //only adds a goal if milestone, title, and description provided
    else if (validTitle && validDescription && milestones.length > 0) {
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
  }

  //sets title
  function titleHandler(enteredTitle) {
    setTitle(enteredTitle);
    if (enteredTitle.length > 0)
      setValidTitle(true);
    else
      setValidTitle(false);
  }

  //sets description
  function descriptionHandler(enteredDescription) {
    setDescription(enteredDescription);
    if (enteredDescription.length > 0)
      setValidDescription(true);
    else
      setValidDescription(false);
  }

  //add a milestone to array
  function addMilestone(enterText, date) {
    if (enterText.length == 0)
      setMilestoneErrorMessage('Please enter a milestone description.');
    else if (!validDate)
      setMilestoneErrorMessage('Please enter an expected completion date tomorrow or later.');
    else {
      if (Platform.OS === 'ios') {
        setShowDateTimePicker(false);
      }
      setMilestones(milestones.concat([enterText]));
      setDateArray(datesArray.concat([date]));
      setMilestoneText('');
      this.myTextInput.clear();
    }
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

    if (currentDate >= new Date()) {
      setMilestoneErrorMessage('');
      setValidDate(true);
    }
    else {
      setMilestoneErrorMessage('Please choose date tomorrow or later.');
      setValidDate(false);
    }
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
            <View style={{ borderWidth: 1 }}>
              <TextInput
                placeholder="title"
                onChangeText={titleHandler}
                value={title}
                maxLength={30}
              />
            </View>

            {/* description */}
            <View style={{ borderWidth: 1 }}>
              <TextInput
                placeholder="description"
                onChangeText={descriptionHandler}
                value={description}
                maxLength={150}
              />
            </View>
          </View>

          {/* Display milestones added */}
          <FlatList
            data={milestones}
            renderItem={({ item }) => (
              <View>
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={item => {
              item + 'x';
            }}
          />

          {/* adding a new milestone */}
          <View style={{ borderWidth: 1 }}>
            <TextInput
              placeholder="add milestone"
              onChangeText={text => setMilestoneText(text)}
              ref={input => {
                this.myTextInput = input;
              }}
              maxLength={30}
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

            <Text style={styles.errorText}>{milestoneErrorMessage}</Text>
            <Button
              title="Add milestone"
              onPress={() => {
                addMilestone(milestoneText, datePicked);
              }}
            />
          </View>

          <Text style={styles.errorText}>{errorMessage}</Text>
          {/* add goal Button */}
          <Button
            title="create"
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
