import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    Settings,
    View,
    Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {getUserData, updateAge, updateFirstName, updateLastName, forgotPassword, deleteAccount} from './settings'
import {settingsScreenStyles} from '../../../assets/styles/styles'

styles = settingsScreenStyles;


function SettingsScreen({ navigation }) {
    const [userData, setUserData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('')
    // const [oldPassword, setOldPassword] = useState('')
    // const [newPassword, setNewPassword] = useState('')
    const [text, setText] = useState()

    const uid = auth().currentUser.uid

    async function getUser() {
        let user;
        user = await getUserData(uid)
        setUserData(user)
      }

    useEffect(() => {
        getUser();
    },[])


    return(
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.title}>Profile Settings</Text>
            <View style={styles.padding}> 
                <View style={styles.container}>
                    <TextInput placeholderTextColor="#000" placeholder={userData.firstName} value={text} onChangeText={(val) => {setFirstName(val)} }/>
                </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateFirstName(uid, firstName)
                    getUser()
                    }
                    }>
                    <Text> Change First Name </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <TextInput placeholderTextColor="#000" placeholder={userData.lastName} value={text} onChangeText={(val) => setLastName(val)}/>
                </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateLastName(uid, lastName)
                    getUser()
                    }
                    }>
                    <Text> Change Last Name </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <TextInput placeholderTextColor="#000" placeholder={userData.age} value = {text} onChangeText={(val) => setAge(val)}/>
                </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    updateAge(uid, age)
                    getUser()
                    }
                    }>
                    <Text> Change Age </Text>
                </TouchableOpacity>
                <View style={styles.resetPassword}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    forgotPassword(userData.email)
                    }
                    }>
                    <Text> Reset password </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.resetPassword}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    deleteAccount(uid)
                    }
                    }>
                    <Text> Deactivate Account </Text>
                    <Text style={styles.desc}>Note: You must be recently signed in to deactivate.</Text>
                </TouchableOpacity>
                </View>
    
                
            
            </View>
            <View style={styles.goBack}>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text> Go Back </Text>
            </TouchableOpacity>

            </View>
           
        </SafeAreaView>
    );
};


export default SettingsScreen;