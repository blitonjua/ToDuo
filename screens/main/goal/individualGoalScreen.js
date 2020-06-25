import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {FlatList} from 'react-native-gesture-handler';
import {addToDo} from '../../../services/toDoList';

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
      <View style={styles.main}>
        <Text style={styles.title}>{goal.title}</Text>
        <Text>{goal.description}</Text>

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
        <View>
          <Text>To Do</Text>
          <FlatList
          // data
          />
          <Button
            title="+"
            onPress={() => {
              console.log(auth().currentUser.uid);
              console.log(goal.goalId);
              addToDo(auth().currentUser.uid, goal.goalId, 'example 1');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  main: {
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 1,
  },
  milestonesText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  flatListContainer: {
    marginTop: 10,
  },
  goalContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  goalContainerTwo: {
    backgroundColor: 'white',
    padding: 7,
    marginTop: 10,
    marginRight: 0.5,
    marginLeft: 0.5,
    marginBottom: 1,
    alignItems: 'stretch',
    borderColor: '#EBEBEB',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  goalText: {},
});

export default individualGoalScreen;
