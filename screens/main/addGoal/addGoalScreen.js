import React, {useState, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from 'react-native';

//firebase
import {addGoalToUserGoalCollection} from '../../../services/setGoals';
import {UserContext} from '../../../services/userContext';

import {addGoalStyles} from '../../../assets/styles/styles';

//the form to add a goal and handles creating the goal.
function AddGoalScreen({route, navigation}) {
  //hooks for goal creation
  const category = route.params.category;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [milestone1, setMilestone1] = useState('');
  const [milestone2, setMilestone2] = useState('');
  const [milestone3, setMilestone3] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const {user, setUser} = useContext(UserContext);

  //creates a goal and adds it to the database
  function addGoalHandler() {
    addGoalToUserGoalCollection(
      user,
      title,
      description,
      [milestone1, milestone2, milestone3],
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

  //sets milestone1
  function milestone1Handler(enteredMilestone) {
    setMilestone1(enteredMilestone);
  }

  //sets milestone2
  function milestone2Handler(enteredMilestone) {
    setMilestone2(enteredMilestone);
  }

  //sets milestone3
  function milestone3Handler(enteredMilestone) {
    setMilestone3(enteredMilestone);
  }

  return (
    <SafeAreaView style={addGoalStyles.safe}>
      {!submitted ? (
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

          {/* milestone1 */}
          <View style={{borderWidth: 1}}>
            <TextInput
              placeholder="milestone1"
              onChangeText={milestone1Handler}
              value={milestone1}
            />
          </View>

          {/* milestone2 */}
          <View style={{borderWidth: 1}}>
            <TextInput
              placeholder="milestone2"
              onChangeText={milestone2Handler}
              value={milestone2}
            />
          </View>

          {/* milestone3 */}
          <View style={{borderWidth: 1}}>
            <TextInput
              placeholder="milestone3.0"
              onChangeText={milestone3Handler}
              value={milestone3}
            />
          </View>

          {/* add goal Button */}
          <Button title="+" onPress={() => addGoalHandler()} />
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
