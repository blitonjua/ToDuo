import React, { useState, useEffect } from 'react';
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
import NotificationManager from '../../NotificationManager'

const styles = appStyles;
const localNotify = new NotificationManager();

//Displays the list of goals that belong to the user and navigates to each goal when pressed
function goalsListScreen({ navigation}) {
  const [goalData, setGoalData] = useState([]);
  
  //retrieve goals from Firebase
  if (auth().currentUser) {
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

  useEffect(() => {
    localNotify.configure(onRegister, onNotification, onOpenNotification);
  }, []);

  function onRegister(token) {
    console.log("[Notification] Registered: ", token);
  }

  function onNotification(notify) {
    console.log("[Notification] onNotification: ", notify);
  }

  function onOpenNotification(notify) {
    console.log("[Notification] onOpenNotification: ", notify);
    alert("Open Notification")
  }

  function onPressCancelNotification() {
    localNotify.cancelAllLocalNotification();
  }

  const onPressSendNotification = (secs) => {
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true
    }
    //localNotify.scheduleNotification(secs);
    localNotify.scheduleNotification(
      1,
      "App Notification",
      "Local Notification",
      {},
      options,
      secs
    )
  }

  function handlePress(item) {
    navigation.navigate('individualGoalScreen', { goal: item });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* Lists out goals */}
        <FlatList
          data={goalData}
          renderItem={({ item }) =>
            // TODO: preferable to move this into a separate function
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={devFlatListStyles.ListItem}>
                <Text style={devFlatListStyles.ListItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.goalId}
        />
        <TouchableOpacity onPress={ () => onPressSendNotification(5)}>
          <Text>Notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default goalsListScreen;
