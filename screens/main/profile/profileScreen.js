import React from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button
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
    <SafeAreaView>
      <TouchableOpacity onPress={() => gotoSettings()}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <Button
        title="Sign out "
        onPress={() => {
          signOut();
        }}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen;