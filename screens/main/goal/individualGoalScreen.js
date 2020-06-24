import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';

import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {FlatList} from 'react-native-gesture-handler';
import 

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
        <Text>
          {goal.description}
        </Text>

        <FlatList style={styles.flatListContainer}
          data={goal.milestones}
          renderItem={({item}) => (
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>{item}</Text>  
              <Text>Due Date</Text>
            </View>       
          )}
        />
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
    padding: 20
  },
  title: {
    fontSize:30,
    fontWeight: 'bold',
    paddingBottom:10,
  },
  flatListContainer: {
    borderColor: 'black'
  },
  goalContainer: {
    margin:10,
    padding:10,
    borderWidth:1,
    borderColor: 'black',
    borderRadius: 10,

  },
  goalText: {

  }
});

export default individualGoalScreen;
