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
import {addUser} from '../../services/fire';
import {signupStyles} from '../../assets/styles/styles';
import LinearGradient from 'react-native-linear-gradient';

const styles = signupStyles;

function SignupScreen({ navigation }) {
  //manage state
  const [showSignIn, setScreen] = useState(true);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [ageText, setAgeText] = useState('');
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function gotoLogin() {
    navigation.navigate('Login');
  }

  const createUser = (firstName, lastName, age, email, pass) => {
    if (firstName.length == 0) setErrorMessage('Please enter a first name');
    else if (lastName.length == 0) setErrorMessage('Please enter a last name');
    else if (age.length == 0) setErrorMessage('Please enter an age');
    else if (email.length == 0) setErrorMessage('Please enter an email');
    else if (pass.length == 0) setErrorMessage('Please enter a password');
    else
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          var user = auth().currentUser;
          addUser(user.uid, firstNameText, lastNameText, ageText, email);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
  };

  return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.safe}>
      <View style={styles.padding}>
      <View style={styles.logoView}>
        <Text style={styles.titleTo}>To</Text>
        <Text style={styles.titleDuo}>Duo</Text>
            </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setFirstNameText(text)}
            placeholder="First Name"
            placeholderTextColor='white'
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setLastNameText(text)}
            placeholder="Last Name"
            placeholderTextColor='white'
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setAgeText(text)}
            placeholder="Age"
            placeholderTextColor='white'
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor='white'
            onChangeText={text => setEmailText(text)}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor='white'
            onChangeText={text => setPasswordText(text)}
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.errorText}>{errorMessage}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              console.log('creating user');
              //send user to the welcome screen
              createUser(firstNameText, lastNameText, ageText, emailText, passwordText);
            }}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkView}
            onPress={() => {
              //send user to log in screen
              gotoLogin();
            }}>
            <Text style={styles.loginLinkText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
  );
}

export default SignupScreen;
