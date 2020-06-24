import React from 'react';
import HooksExample from '../chat/components/HooksExample';
import auth from '@react-native-firebase/auth';
import { UserContext, ToContext } from '../chat/contexts'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

function MessageScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
        <Text>This is the MessageScreen</Text>
      </View>
      <UserContext.Provider value={auth().currentUser}>
        <HooksExample />
      </UserContext.Provider>
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

export default MessageScreen;
