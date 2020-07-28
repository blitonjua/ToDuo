import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

//custom imports
// import { authStyles } from './authStack';
import { loginStyles } from '../../assets/styles/styles';

const styles = loginStyles;

function LoginScreen({ navigation }) {
  //manage state
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [validEmailStyle, setValidEmailStyle] = useState({});
  const [validPassStyle, setValidPassStyle] = useState({});

  function gotoSignup() {
    // setScreen(!showSignIn);
    navigation.navigate('Signup');
  }

  const signUserIn = (email, pass) => {
    auth().signInWithEmailAndPassword(email, pass)
      .catch(error => {
        //wrong password
        error.code === 'auth/wrong-password' ?
          setValidPassStyle({ backgroundColor: 'pink' }) :
          setValidPassStyle({});
        //wrong email
        error.code === 'auth/invalid-email' || emailText.length == 0 ?
          setValidEmailStyle({ backgroundColor: 'pink' }) :
          setValidEmailStyle({});
      })
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <Text style={styles.title}>ToDuo</Text>
        <View style={[styles.container, validEmailStyle]}>
          <TextInput style={styles.textInput}
            placeholder="Email"
            onChangeText={text => setEmailText(text)}
          />
        </View>

        <View style={[styles.container, validPassStyle]}>
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
