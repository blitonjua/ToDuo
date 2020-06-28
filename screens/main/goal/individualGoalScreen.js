import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';

import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import { individualGoalStyles } from '../../../assets/styles/styles';
const styles = individualGoalStyles;

function individualGoalScreen({route, navigation}) {

  const {goal} = route.params;

  let uid = auth().currentUser.uid;

  function gotoMessage() {
    navigation.navigate('Message');
  }

  function gotoApprove() {
    navigation.navigate('Approve');
  }

  console.log(goal.title);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
          <Text style={styles.title}>{goal.title}</Text>
        <Text>
          {goal.description}
        </Text>

        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
        <FlatList
          data={goal.milestones}
          renderItem={({item}) => (
            <View style={styles.goalContainerTwo}>
              <Text style={styles.goalText}>{item}</Text>  
              <Text>Due Date</Text>
            </View>       
          )}
        />
        </View>
      </View>
      <Button title='msg' onPress={() => {navigation.navigate('messageScreen', {goal: route})}}/>
    </SafeAreaView>
  );
}

export default individualGoalScreen;
