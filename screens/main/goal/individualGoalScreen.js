import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

//styles
import { individualGoalStyles } from '../../../assets/styles/styles';
const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function individualGoalScreen({ route, navigation }) {

  const { goal } = route.params;

  //list item renderer
  function ListItem({ item }) {
    return (
      <View style={styles.goalContainerTwo}>
        <Text style={styles.goalText}>{item}</Text>
        <Text>Due Date</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>
          GO BACK
        </Text>
      </TouchableOpacity>

      <View style={styles.padding}>
        {/* overview info */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text>
          {goal.description}
        </Text>

        {/* milestones */}
        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
          <FlatList
            data={goal.milestones}
            renderItem={({ item }) => <ListItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <Button title='msg' onPress={() => {navigation.navigate('messageScreen', {goal: route})}}/>
    </SafeAreaView>
  );
}

export default individualGoalScreen;
