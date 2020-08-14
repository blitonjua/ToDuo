import React, {useContext, useState, useEffect} from 'react';
import {Text, SafeAreaView, TouchableOpacity, View, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {UserContext} from '../../../services/userContext';

import {profileIcons} from '../../../assets/images/profileIcons';

import {profileStyles} from '../../../assets/styles/styles';
import {getUserData} from './settings';
import ProfilePhoto from './profilePhoto';
import LinearGradient from 'react-native-linear-gradient';



const styles = profileStyles;

function ProfileScreen({navigation}) {
  //current user state
  const [userData, setUserData] = useState({});
  const {user, setUser} = useContext(UserContext);

  async function getUser() {
    setUserData(await getUserData(user));
  }

  useEffect(() => {
    getUser();
  }, []);

  //signs the user out and redirects to login screen
  const signOut = () => {
    auth().signOut();
    setUser(null);
  };

  //navigates to the settings
  function gotoSettings() {
    navigation.navigate('settingsStack');
  }

  //navigates to the past goals
  function gotoPastGoals() {
    navigation.navigate('pastGoalsScreen');
  }

  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.mainContainer}>
        <View style={styles.main}>
          <View style={{alignItems:'center'}}>
          <ProfilePhoto user={user} />
          </View>

        <Text style={styles.name}>
          {/* {userData.firstName} {userData.lastName} */}
        </Text>

        {/* archive*/}
        <TouchableOpacity
          onPress={() => gotoPastGoals()}
          style={styles.button}>
          <Text style={styles.buttonText}>See Past Goals</Text>
        </TouchableOpacity>
        {/* Settings button */}
        <TouchableOpacity
          onPress={() => gotoSettings()}
          style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity onPress={() => signOut()} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        </View>
      </LinearGradient>
  );
}

export default ProfileScreen;
