import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import readFromDatabase from '../services/fire';

const Welcome = props => {
  const signOut = () => {
    console.log(readFromDatabase());
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <Text>Welcome props.email!</Text>
      <Button
        title="Sign out "
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
export default Welcome;
