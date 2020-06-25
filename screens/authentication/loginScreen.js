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
import LinearGradient from 'react-native-linear-gradient';


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
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4568dc', '#b06ab3']} style={styles.background}>
            <View style={styles.padding}>
                <Text style={styles.title}>ToDuo</Text>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholderTextColor="white"
                        placeholder="Email"
                        onChangeText={text => setEmailText(text)}
                    />
                </View>
                
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true} placeholderTextColor="white"
                        placeholder="Password"
                        onChangeText={text => setPasswordText(text)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.designButton}
                        onPress={() => {
                            //send user to welcome screen
                            signUserIn(emailText, passwordText);
                        }}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.designButton}
                        onPress={() => {
                            //send user to sign up screen
                            gotoSignup();
                        }}>
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            </LinearGradient>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({

    main: {
        flex:1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    padding: {
        padding: 20,
    },
    textInput: {
        fontSize: 16,
        borderRadius:10,
        backgroundColor: 'rgba(000,000,000,0.3)',
        fontFamily: 'BloggerSans-Medium',
        textAlign:'left',
        height:50,
        paddingLeft:10,
        color:'white'
    },
    title: {
        fontSize: 80,
        color:'white',
        textAlign: 'center',
        fontFamily: 'BloggerSans-BoldItalic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    container: {
        marginBottom:10, 
    },

    //buttons--------------------
    buttons: {
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontFamily:'BloggerSans-MediumItalic',
        fontSize: 20
    },
    designButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        backgroundColor:'transparent',
        borderColor:'white',
        borderRadius: 60,
        height: 40,
        marginBottom:10
    },
    background: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});

export default LoginScreen;
