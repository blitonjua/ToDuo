import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import {getGoalData} from '../../../services/getData';
import {getDisplayableGoals} from '../../../services/getGoals';
//styles
import {appStyles, devFlatListStyles} from '../../../assets/styles/styles';
import {getMilestonesAsObjects} from '../../../services/getData';
const styles = appStyles;

//Displays the list of goals that belong to the user and navigates to each goal when pressed
function GoalsListScreen({navigation}) {
  const [goalData, setGoalData] = useState([]);
  const [milestones, setMilestones] = useState([]);

  //retrieve goals from Firebase
  /*
  if (auth().currentUser) {
    let uid = auth().currentUser.uid;

    async function getGoals() {
      let data = await getGoalData(uid);
      return data;
    }
    function setData() {
      getGoals().then(function(val) {
        setGoalData(val);
      });
    }
    setData();
  //*/
  async function getGoals() {
    let goals;
    goals = await getDisplayableGoals();
    setGoalData(goals);
  }

  useEffect(() => {
    getGoals();
  });

  function gotoIndividualGoal(item) {
    navigation.navigate('individualGoalDisplay', {goal: item});
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* Lists out goals */}
        <FlatList
          data={goalData}
          renderItem={({item}) => (
            // TODO: preferable to move this into a separate function
            <TouchableOpacity onPress={() => gotoIndividualGoal(item)}>
              <View style={devFlatListStyles.ListItem}>
                <Text style={devFlatListStyles.ListItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </SafeAreaView>
  );
}
export default GoalsListScreen;
