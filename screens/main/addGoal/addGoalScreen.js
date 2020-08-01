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

import {addGoalToUserGoalCollection} from '../../../services/setGoals';
import {FlatList} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserContext} from '../../../services/userContext';

import {addGoalStyles} from '../../../assets/styles/styles';

//the form to add a goal and handles creating the goal.
function AddGoalScreen({ route, navigation }) {
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

  const styles = addGoalStyles;

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
    <SafeAreaView style={addGoalStyles.safe}>
      {!submitted ? (
        <View styles={styles.main}>

          {/* title */}
          <View style={styles.textInput}>
            <TextInput
              placeholder="title"
              placeholderTextColor='gray'
              style={{color: 'white'}}
              onChangeText={titleHandler}
              value={title}
            />
          </View>

          {/* description */}
          <View style={styles.textInput}>
            <TextInput
              placeholder="description"
              placeholderTextColor='gray'
              style={{color: 'white'}}
              onChangeText={descriptionHandler}
              value={description}
            />
          </View>

          <View style={styles.padding}>
          {/* Display milestones added */}
          <FlatList
            data={milestones}
            renderItem={({item}) => (
              <View style={{padding: 5,
              margin: 2,
              borderBottomWidth: 1,
              borderBottomColor: 'white'}}>
                <Text style={{color:'white'}}>{item}</Text>
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
              style={{color: 'white'}}
              onChangeText={text => setMilestoneText(text)}
              ref={input => {
                this.myTextInput = input;
              }}
            />
          </View>

          <TouchableOpacity onPress={() => setShowDateTimePicker(true)}
              style={styles.wideButton}> 
              <Text style={styles.text}>Pick Date</Text>
            </TouchableOpacity>

            {showDateTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={defaultDate}
                mode="date"
                style={{backgroundColor:'gray',}}
                darkisDarkModeEnabled={true}
                onChange={(e, d) => {
                  if (Platform.OS === 'android') {
                    setShowDateTimePicker(false);
                  }
                  onDateSelected(e, d);
                }}
              />
            )}
            <TouchableOpacity style={styles.wideButton}
            onPress={() => {
              if (Platform.OS === 'ios') {
                setShowDateTimePicker(false);
              }
              addMilestone(milestoneText, datePicked);
              setMilestoneText('');
              this.myTextInput.clear();
            }}>
            <Text style={styles.text}>Add Milestone</Text>
            </TouchableOpacity>

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
