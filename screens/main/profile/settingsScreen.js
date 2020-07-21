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
import {getUserData, updateUserData, changePassword} from './settings'


function SettingsScreen({ navigation }) {
    const [userData, setUserData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [text, setText] = useState()

    const uid = auth().currentUser.uid

    async function getUser() {
        let user;
        user = await getUserData(uid)
        setUserData(user)
      }

    const passwordHandler = (oldPass, newPass) => {
        changePassword(oldPass, newPass)
    }

    useEffect(() => {
        getUser();
    },[])


    return(
        <SafeAreaView>
            <View>
                <TextInput value={text} onChangeText={(val) => {
                    console.log(val)

                    setFirstName(val)}
                
                }/>
                <TextInput value={text} onChangeText={(val) => setLastName(val)}/>
                <TextInput value = {text} onChangeText={(val) => setAge(val)}/>
                <TouchableOpacity onPress={() => {
                    updateUserData(uid, firstName, lastName, age)
                    setText('')
                    }
                    }>
                    <Text> Change </Text>
                </TouchableOpacity>
                <TextInput onChangeText={(val) => {
                 setOldPassword(val) }
                }/>
                <TextInput onChangeText={(val) => setNewPassword(val)}/>
                <Button title="Button"onPress={ () => {
                    passwordHandler(oldPassword, newPassword)

                }}/>
                    <Text> Change Password</Text>
            
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text> Go Back </Text>
            </TouchableOpacity>
           
        </SafeAreaView>
    );
};

// changing password
// update name
// delete account

export default SettingsScreen;