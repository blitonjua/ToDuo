import React, {useContext, useState, useEffect} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { getUserData, updateAge, updateFirstName, updateLastName, forgotPassword, deleteAccount } from './settings';
import { settingsScreenStyles } from '../../../assets/styles/styles';
import { UserContext } from '../../../services/userContext';
import ProfilePhoto from './profilePhoto';
import LinearGradient from 'react-native-linear-gradient';


styles = settingsScreenStyles;


function SettingsScreen({ navigation }) {
    const [userData, setUserData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [text, setText] = useState();
    const {user, setUser} = useContext(UserContext);


    const uid = auth().currentUser.uid

    async function getUser() {
        let user;
        user = await getUserData(uid)
        setUserData(user)
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.mainContainer}>
            <View style={styles.padding}> 
            <View style={styles.profilePicture}>
                <ProfilePhoto user={user} />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('changeProfilePicture')
                }}>
                    <Text style={styles.buttonText}> Change Profile Picture</Text>
                </TouchableOpacity>
            </View>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholderTextColor="#fff" placeholder={userData.firstName} value={text} onChangeText={(val) => {setFirstName(val)} }/>
                </View>

                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateFirstName(uid, firstName)
                    getUser()
                    }
                    }>
                    <Text style={styles.buttonText}> Change First Name </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholderTextColor="#fff" placeholder={userData.lastName} value={text} onChangeText={(val) => setLastName(val)}/>
                </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateLastName(uid, lastName)
                    getUser()
                    }
                    }>
                    <Text style={styles.buttonText}> Change Last Name </Text>
                </TouchableOpacity>
               
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholderTextColor="#fff" placeholder={userData.age} value = {text} onChangeText={(val) => setAge(val)}/>
                </View>

                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateAge(uid, age)
                    getUser()
                    }
                    }>
                    <Text style={styles.buttonText}> Change Age </Text>
                </TouchableOpacity>
                <View style={styles.resetPassword}>
                </View>

                <TouchableOpacity style={styles.secondButton} onPress={() => {
                    forgotPassword(userData.email)
                    }
                    }>
                    <Text style={styles.buttonText}> Reset Password </Text>
                </TouchableOpacity>
                <View style={styles.resetPassword}>
                <TouchableOpacity style={styles.secondButton} onPress={() => {
                    navigation.navigate('DeactivationScreen')
                    }
                    }>
                    <Text style={styles.buttonText}> Deactivate Account </Text>
                </TouchableOpacity>
                </View>


            </View>
            <View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}> Go Back </Text>
            </TouchableOpacity>

            </View>
        </LinearGradient>
    );
};


export default SettingsScreen;