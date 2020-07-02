import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
//firebase
import { getDisplayableGoals } from '../../../services/getGoals';
//styles
import { appStyles, devFlatListStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//Displays the list of goals that belong to the user and navigates to each goal when pressed
function GoalsListScreen({ navigation }) {
  const [goalData, setGoalData] = useState([]);
  
  async function getGoals() {
    let goals;
    goals = await getDisplayableGoals()
    setGoalData(goals);
  }
  getGoals();

  function gotoIndividualGoal(item) {
    navigation.navigate('individualGoalDisplay', { goal: item });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* Lists out goals */}
        <FlatList
          data={goalData}
          renderItem={({ item }) =>
            // TODO: preferable to move this into a separate function
            <TouchableOpacity onPress={() => gotoIndividualGoal(item)}>
              <View style={devFlatListStyles.ListItem}>
                <Text style={devFlatListStyles.ListItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.goalId}
        />
      </View>
    </SafeAreaView>
  );
}
export default GoalsListScreen;
