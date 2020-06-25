import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import { useLinkBuilder } from '@react-navigation/native';
import { appStyles } from '../../../assets/styles/styles';
const styles = appStyles;

function goalsListScreen({navigation}) {
  const [goalData, setGoalData] = useState([]);
  

  auth().onAuthStateChanged(function(user) {
    if (user) {
      let uid = auth().currentUser.uid;
  async function getGoals() {
    let data = await getGoalData(uid);
    return data;
  }
  const setData = () => {
    getGoals().then(function(val) {
      setGoalData(val);
    });
  };
  setData();
    }
  });

  





  console.log(goalData);
  

  

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* add the flat list */}
        <FlatList
          data={goalData}
          renderItem={({item}) => (
            <Button
              title={item.title}
              onPress={() => {
                navigation.navigate('individualGoalScreen', {goal: item});
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default goalsListScreen;
