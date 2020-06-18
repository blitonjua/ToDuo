import React from 'react';
import {
    Text,
    View,
    Button
  } from 'react-native';

import auth from '@react-native-firebase/auth';


function Settings() {
    const signOut = () => {
        auth().signOut();
      };

    return (
    <View>
            <Text>Settings</Text>
            <Button
            title="Sign out "
            onPress={() => {
              signOut();
            }}
          />
    </View>
            
      
    )
}

export default Settings;