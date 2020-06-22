import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {FlatList} from 'react-native-gesture-handler';

function goalsListScreen({navigation}) {
  const [goalData, setGoalData] = useState([]);
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
                navigation.navigate('dashBoard', {goal: item});
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  main: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default goalsListScreen;
