import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';

import {deleteAccount} from './settings'


//displays the past goals of the user
function DeactivationScreen({ navigation }) {

    const signOut = () => {
        auth().signOut();
      };
    

    return (
        <SafeAreaView style={styles.safe}>
            <View>
                <Text>Are you sure you want to deactivate your account? You must be recently logged in to deactivate.</Text>
            <TouchableOpacity style={styles.button}
          onPress={() => signOut()}>
          <Text>
            Sign Out and Login Again
          </Text>
        </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => {
                    deleteAccount(uid)
                    }
                    }>
                    <Text> Deactivate Account </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.goBack()
                    }
                    }>
                    <Text> Go Back </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default DeactivationScreen;