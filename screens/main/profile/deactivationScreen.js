import React, { useContext } from 'react';
import { UserContext } from '../../../services/userContext';

import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {settingsScreenStyles} from '../../../assets/styles/styles'

styles = settingsScreenStyles;


import {deleteAccount} from './settings'


//displays the past goals of the user
function DeactivationScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
    const signOut = () => {
        auth().signOut();
        setUser(null);
      };
    

    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.mainContainer}>
            <View style={styles.secondContainer}>
              <View style={styles.general}>
                <Text style={styles.generalText}>Are you sure you want to deactivate your account? You must be recently logged in to deactivate.</Text>
            </View>
            <TouchableOpacity style={styles.secondButton}
          onPress={() => signOut()}>
          <Text style={styles.buttonText}>
            Sign Out and Login Again
          </Text>
        </TouchableOpacity>
        <View style={styles.resetPassword}>
            
            <TouchableOpacity style={styles.secondButton} onPress={() => {
                    deleteAccount(auth().currentUser.uid)
                    }
                    }>
                    <Text style={styles.buttonText}> Deactivate Account </Text>
                </TouchableOpacity>
                </View>

                <View style={styles.resetPassword}>

                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.goBack()
                    }
                    }>
                    <Text style={styles.buttonText}> Go Back </Text>
                </TouchableOpacity>
                </View>

            </View>
            </LinearGradient>

    )
}

export default DeactivationScreen;