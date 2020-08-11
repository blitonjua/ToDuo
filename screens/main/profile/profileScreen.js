import React, {useContext, useState, useEffect} from 'react';
import {Text, SafeAreaView, TouchableOpacity, View, Image} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import {UserContext} from '../../../services/userContext';
import firestore from '@react-native-firebase/firestore';
//consts
import {profileIcons} from '../../../assets/images/profileIcons';
//styles
import {profileStyles} from '../../../assets/styles/styles';
import {getUserData} from './settings';
import ProfilePhoto from './profilePhoto';
const styles = profileStyles;

function ProfileScreen({navigation}) {
  //current user state
  const [userData, setUserData] = useState({});
  const {user, setUser} = useContext(UserContext);
  console.log('user context is ' + user);

  async function getUser() {
    setUserData(await getUserData(user));
  }

  useEffect(() => {
    //getUser();
    console.log('hi in profilescreen');
    console.log('user is in usefect ' + user);
    if (user !== null){
    firestore()
      .collection('Users')
      .doc(user)
      .get()
      .then(
        docRef => {
          console.log("got doc");
          let docData = docRef.data();
          let dataObject = {
            firstName: docData.firstName,
            lastName: docData.lastName,
          //profileIndex: docData.profileIndex,
          };
          console.log("first: " + dataObject.firstName);
          setUserData(dataObject);
      });
    }
  }, [user]);

  //signs the user out and redirects to login screen
  const signOut = () => {
    auth().signOut();
    setUser(null);
  };

  //navigates to the settings
  function gotoSettings() {
    navigation.navigate('settingsScreen');
  }

  //navigates to the past goals
  function gotoPastGoals() {
    navigation.navigate('pastGoalsScreen');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* Profile picture */}
        <ProfilePhoto user={user} />

        {/* name */}
        <Text style={styles.name}>
          {userData.firstName} {userData.lastName}
        </Text>

        {/* <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.detailsTitle}>
              User ID:
            </Text>
            <Text style={styles.detailsBody}>
              {user}
            </Text>
          </View>
        </View> */}

        {/* archive*/}
        <TouchableOpacity
          onPress={() => gotoPastGoals()}
          style={styles.settings}>
          <Text style={styles.buttonText}>See past goals</Text>
        </TouchableOpacity>
        {/* Settings button */}
        <TouchableOpacity
          onPress={() => gotoSettings()}
          style={styles.settings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity onPress={() => signOut()} style={styles.signout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
