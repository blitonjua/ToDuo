import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import auth from '@react-native-firebase/auth';

//custom imports
// import { authStyles } from './authStack';
import { loginStyles } from '../../assets/styles/styles';
import LinearGradient from 'react-native-linear-gradient';

const styles = loginStyles;

function LoginScreen({ navigation }) {
  //manage state
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [validEmailStyle, setValidEmailStyle] = useState({});
  const [emailError, setEmailError] = useState('');
  const [validPassStyle, setValidPassStyle] = useState({});
  const [passError, setPassError] = useState('');

  function gotoSignup() {
    // setScreen(!showSignIn);
    navigation.navigate('Signup');
  }

  const signUserIn = (email, pass) => {
    if (email.length == 0) {
      setValidEmailStyle({ backgroundColor: 'pink' });
      setEmailError('Please enter an email');
      setValidPassStyle({});
      setPassError();
    }
    else if (pass.length == 0) {
      setValidPassStyle({ backgroundColor: 'pink' });
      setPassError('Please enter your password');
      setValidEmailStyle({});
      setEmailError();
    }
    else
      auth().signInWithEmailAndPassword(email, pass)
        .catch(error => {
          //wrong password
          if (error.code === 'auth/wrong-password') {
            setValidPassStyle({ backgroundColor: 'pink' });
            setPassError(error.message);
          }
          else {
            setValidPassStyle({});
            setPassError();
          }
          //wrong email
          if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
            setValidEmailStyle({ backgroundColor: 'pink' });
            setEmailError(error.message);
          }
          else {
            setValidEmailStyle({});
            setEmailError();
          }
        })
  };

  return (
    
    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.safe}>
      <View>
        <StatusBar barStyle={Platform.OS === 'ios'? 'light-content':'default'} backgroundColor='black'/>
      </View>
      <View style={styles.padding}>
        <View style={styles.logoView}>
        <Text style={styles.titleTo}>To</Text>
        <Text style={styles.titleDuo}>Duo</Text>
            </View>
        <Text style={styles.errorText}>{emailError}</Text>
        <View style={[styles.container, validEmailStyle]}>
          <TextInput style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#fff"
            onChangeText={text => setEmailText(text)}
          />
        </View>

        <Text style={styles.errorText}>{passError}</Text>
        <View style={[styles.container, validPassStyle]}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#fff"
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
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              //send user to sign up screen
              gotoSignup();
            }}>
            <Text style={styles.signupLinkText}>
              Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </View>
      </LinearGradient>
  );
};

export default LoginScreen;
