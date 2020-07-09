import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
//styles
import { profileStyles } from '../../../assets/styles/styles';
const styles = profileStyles;


function ProfileScreen({ navigation }) {
  //signs the user out and redirects to login screen
  const signOut = () => {
    auth().signOut();
  };

  //navigates to the settings
  function gotoSettings() {
    navigation.navigate("settingsScreen");
  }

  //navigates to the past goals
  function gotoPastGoals() {
    navigation.navigate("pastGoalsScreen");
  }

  return (
    <SafeAreaView styles={styles.safe}>
      <View style={styles.main}>
        {/* Profile picture */}
        <View style={styles.profilePic} />
        
        {/* name */}
        <Text style={styles.name}>
          Firstname Lastname
        </Text>

        <View style={styles.details}>
          {/* User ID */}
          <View style={styles.row}>
            <Text style={styles.detailsTitle}>
              User ID: 
            </Text>
            <Text style={styles.detailsBody}>
              *User ID here*
            </Text>
          </View>

          {/* Bio */}
          <Text style={styles.detailsTitle}>
            Bio:
          </Text>
          <Text style={styles.detailsBody}>
            {'\t'}This will be where the main description of the user will be.
          </Text>
        </View>
      
        <TouchableOpacity
          onPress={() => gotoPastGoals()}>
          <Text>
            See past goals
          </Text>
        </TouchableOpacity>
        {/* Settings button */}
        <TouchableOpacity 
          onPress={() => gotoSettings()}
          style={styles.settings}>
          <Text style={styles.buttonText}>
            Settings
          </Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.signout}>
          <Text style={styles.buttonText}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen;