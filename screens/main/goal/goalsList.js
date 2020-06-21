import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

function goalsListScreen({navigation}) {
  function gotoDashBoard() {
    navigation.navigate('dashBoard');
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* add the flat list */}
        <Text>This is the goals list</Text>
        <TouchableOpacity onPress={() => gotoDashBoard()}>
          <Text>Go to DashBoard</Text>
        </TouchableOpacity>
      </View>
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

export default goalsListScreen;
