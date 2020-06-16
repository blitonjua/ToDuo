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

function LoginScreen({ navigation }) {
    //manage state
    const [showSignIn, setScreen] = useState(true);
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


            <View style={styles.buttons}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    main: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    textInput: {
        fontWeight: '100',
        fontSize: 16
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 7,
        marginTop: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderColor: '#EBEBEB',
        borderRadius: 10,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },

    //buttons--------------------
    buttons: {
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 2,
    },
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
        color: '#e33232',
        fontSize: 15,
        letterSpacing: 2,
        fontWeight: 'bold'
    }
});

export default LoginScreen;
