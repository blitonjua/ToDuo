import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

function ProfileScreen({ navigation }) {
  //signs the user out and redirects to login screen
  const signOut = () => {
    auth().signOut();
  };

  function gotoSettings() {
    navigation.navigate("Settings");
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
  profilePic: {
    height: 80,
    width: 80,
    backgroundColor: 'black',
    borderRadius: 40,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20
  },
  row: {
    flexDirection: 'row',
  },
  details: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    paddingVertical: 10,
    marginBottom: 40,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  detailsBody: {
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  settings: {
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  signout: {
    backgroundColor: 'red',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },  
});

export default ProfileScreen;