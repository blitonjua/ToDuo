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

import { addGoalStyles } from '../../../assets/styles/styles';

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

  const styles = addGoalStyles;

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
    <SafeAreaView style={addGoalStyles.safe}>
      {!submitted ? (
        <View styles={styles.main}>

          {/* title */}
          <View style={styles.textInput}>
            <TextInput
              placeholder="title"
              placeholderTextColor='gray'
              style={{ color: 'white' }}
              onChangeText={titleHandler}
              value={title}
            />
          </View>

          {/* description */}
          <View style={styles.textInput}>
            <TextInput
              placeholder="description"
              placeholderTextColor='gray'
              style={{ color: 'white' }}
              onChangeText={descriptionHandler}
              value={description}
            />
          </View>

          <View style={styles.padding}>
            {/* Display milestones added */}
            <FlatList
              data={milestones}
              renderItem={({ item }) => (
                <View style={{
                  padding: 5,
                  margin: 2,
                  borderBottomWidth: 1,
                  borderBottomColor: 'white'
                }}>
                  <Text style={{ color: 'white' }}>{item}</Text>
                </View>
              )}
              keyExtractor={item => {
                item + 'x';
              }}
            />
          </View>

          {/* adding a new milestone */}
          <View style={styles.textInput}>
            <TextInput
              placeholder="add milestone"
              placeholderTextColor='gray'
              style={{ color: 'white' }}
              onChangeText={text => setMilestoneText(text)}
              ref={input => {
                this.myTextInput = input;
              }}
              maxLength={30}
            />
          </View>

          <Button
            title="Show Calendar"
            onPress={() => setShowDateTimePicker(true)}
          />

          {showDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={defaultDate}
              mode="date"
              style={{ backgroundColor: 'gray', }}
              darkisDarkModeEnabled={true}
              onChange={(e, d) => {
                if (Platform.OS === 'android') {
                  setShowDateTimePicker(false);
                }
                onDateSelected(e, d);
              }}
            />
          )}

          <Text style={styles.errorText}>{milestoneErrorMessage}</Text>
          <TouchableOpacity style={styles.wideButton}
            onPress={() => {
              addMilestone(milestoneText, datePicked);
            }}>
            <Text style={styles.text}>Add Milestone</Text>
          </TouchableOpacity>

          <Text style={styles.errorText}>{errorMessage}</Text>
          {/* add goal Button */}
          <TouchableOpacity style={styles.wideButton} onPress={() => {
            addGoalHandler();
          }}>
            <Text style={styles.text}>Create</Text>
          </TouchableOpacity>

        </View>
      ) : (
          //renders on successfully adding goal
          <View style={styles.main}>
            <Text style={styles.text}>Goal Added! You can access your goal in the Goal tab.</Text>
          </View>

          //maybe add an option to add another goal or make sure this goes back to
          // the big plus button once we leave this screen
        )}
    </SafeAreaView>
  );
}
export default AddGoalScreen;
