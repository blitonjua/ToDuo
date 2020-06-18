import React from 'react';
import {
    Text,
    SafeAreaView,
    Button
} from 'react-native';

import auth from '@react-native-firebase/auth';

function ProfileScreen() {
  //signs the user out and redirects to login screen
  const signOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView>
      <Text>Settings</Text>
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