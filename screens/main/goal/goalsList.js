import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
//styles
import { appStyles, devFlatListStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//Displays the list of goals that belong to the user and navigates to each goal when pressed
function goalsListScreen({ navigation }) {
  const [goalData, setGoalData] = useState([]);

  //retrieve goals from Firebase
  auth().onAuthStateChanged(function (user) {
    if (user) {
      let uid = auth().currentUser.uid;
      async function getGoals() {
        let data = await getGoalData(uid);
        return data;
      }
      function setData() {
        getGoals().then(function (val) {
          setGoalData(val);
        });
      };
      setData();
    }
  });

  //item renderer for FlatList
  function ListItem({ item }) {
    return (
      <View style={devFlatListStyles.ListItem}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('individualGoalScreen', { goal: item });
          console.log('pressed');
        }}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* Lists out goals */}
        <FlatList
          data={goalData}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
export default goalsListScreen;
