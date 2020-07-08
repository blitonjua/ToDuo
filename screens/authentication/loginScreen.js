import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';


//custom imports
// import { authStyles } from './authStack';
import { loginStyles } from '../../assets/styles/styles';

const styles = loginStyles;

function LoginScreen({ navigation }) {
  //manage state
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  //notifs
  FCM = messaging();
  ref = firestore().collection("Users");
  // check to make sure the user is authenticated  
  auth().onAuthStateChanged(user => {
  // requests permissions from the user
  FCM.requestPermission();
  // gets the device's push token
  FCM.getToken().then(token => {
   
   // stores the token in the user's document
   this.ref.doc(user.uid).update({ pushToken: token });
  });
  
});

  function gotoSignup() {
    // setScreen(!showSignIn);
    navigation.navigate('Signup');
  }

  const signUserIn = (email, pass) => {
    auth().signInWithEmailAndPassword(email, pass);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <Text style={styles.title}>ToDuo</Text>
        <View style={styles.container}>
          <TextInput style={styles.textInput}
            placeholder="Email"
            onChangeText={text => setEmailText(text)}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => setPasswordText(text)}
          />
        </View>


        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.logInButton}
            onPress={() => {
              //send user to welcome screen
              signUserIn(emailText, passwordText);
            }}>
            <Text style={styles.buttonText}>
              LOG IN
                        </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              //send user to sign up screen
              gotoSignup();
            }}>
            <Text style={styles.signupLinkText}>
              SIGN UP
                        </Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
