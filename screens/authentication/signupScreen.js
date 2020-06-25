import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

//custom imports
import { addUser } from '../../services/fire';
import { authStyles } from './authStack';

function SignupScreen({ navigation }) {
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
                console.log('User account created & signed in!');
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
        <SafeAreaView style={styles.safe}>
            <View style={styles.padding}>
                <Text style={styles.title}>ToDuo</Text>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstNameText(text)}
                        placeholder="First Name" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setLastNameText(text)}
                        placeholder="Last Name" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setAgeText(text)}
                        placeholder="Age" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={text => setEmailText(text)}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ...authStyles,
    signupButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e33232',
        borderRadius: 60,
        height: 40
    },
    loginLinkText: {
        color: '#42aaf5',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 2,
    },
});
export default SignupScreen;
