import React, {useState} from 'react';
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

function SignupScreen({navigation}) {
  //manage state
  const [showSignIn, setScreen] = useState(true);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [ageText, setAgeText] = useState('');
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');

  function gotoLogin() {
    navigation.navigate('Login');
  }

  const createUser = (email, pass, firstName, lastName, age) => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        //firstName, lastName, newAge, email
        var user = auth().currentUser;
        addUser(user.uid, firstNameText, lastNameText, ageText, email);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.themedSafe}>
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

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              console.log('creating user');
              //send user to the welcome screen
              createUser(emailText, passwordText);
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
    </SafeAreaView>
  );
}

export default SignupScreen;
