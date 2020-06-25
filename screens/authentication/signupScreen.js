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
import { addUser } from '../../services/fire';
import LinearGradient from 'react-native-linear-gradient';


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
        <SafeAreaView style={styles.main}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4568dc', '#b06ab3']} style={styles.background}>
            <View style={styles.padding}>
                <Text style={styles.title}>ToDuo</Text>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstNameText(text)}
                        placeholderTextColor="white"
                        placeholder="First Name" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor="white"
                        onChangeText={text => setLastNameText(text)}
                        placeholder="Last Name" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor="white"
                        onChangeText={text => setAgeText(text)}
                        placeholder="Age" />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="white"
                        onChangeText={text => setEmailText(text)}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor="white"
                        placeholder="Password"
                        onChangeText={text => setPasswordText(text)}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.designButton}
                        onPress={() => {
                            console.log('creating user');
                            //send user to the welcome screen
                            createUser(emailText, passwordText);
                        }}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.designButton}
                        onPress={() => {
                            //send user to log in screen
                            gotoLogin();
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
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
        marginBottom:10,
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
export default SignupScreen;
