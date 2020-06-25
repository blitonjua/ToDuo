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
import { authStyles } from './authStack';
import { colors } from '../../assets/styles/styleVars';

function LoginScreen({ navigation }) {
    //manage state
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');


    function gotoSignup() {
        // setScreen(!showSignIn);
        navigation.navigate('Signup');
    }

    const signUserIn = (email, pass) => {
        auth().signInWithEmailAndPassword(email, pass);
    };

    return (
        <SafeAreaView style={styles.main}>
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

const styles = StyleSheet.create({
    ...authStyles,
    title: {
        fontSize: 60,
        textAlign: 'left',
        fontFamily: 'BloggerSans-BoldItalic'
    },
    //buttons--------------------
    logInButton: {	
        alignItems: 'center',	
        justifyContent: 'center',	
        backgroundColor: '#42aaf5',	
        borderRadius: 60,	
        height: 40	
    },

    //links----------------------
    link: {
        alignItems: 'center',
        marginTop: 10
    },
    signupLinkText: {
        color: colors.red,
        fontSize: 15,
        letterSpacing: 2,
        fontWeight: 'bold'
    }
});

export default LoginScreen;
