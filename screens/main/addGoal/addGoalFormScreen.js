import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    View,
    Button
} from 'react-native';
import auth from '@react-native-firebase/auth';

import { addGoalToUserGoalCollection } from '../../../services/createGoal';
 

function AddGoalFormScreen({ navigation }) {
    //navigates back to Plus
    function goBack() {
        navigation.navigate('Plus');
    }
    // listOutDatabase();
    const addGoalHandler = title => {
        //some stuff
    };

    const [goal, setGoal] = useState('');

    const onChangeTextHandler = enteredGoal => {
        //some stuff
        setGoal(enteredGoal);
    };


    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => goBack()}>
                <Text>
                    Go Back because you don't know what your goal is lame-o
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addGoalHandler()}>
                <Text>Add Goal</Text>
            </TouchableOpacity>
            <View style={{borderWidth:1}}>
                <TextInput onChangeText={() => onChangeTextHandler()} value={goal} />
            </View>
            <Text>{goal}</Text>
            <Button
                title="+"
                onPress={() => {
                    //change static values for title, description and milestones
                    addGoalToUserGoalCollection(
                        auth().currentUser.uid,
                        'title',
                        'description',
                        ['milestone1', 'milestone2', 'milestone3'],
                    );
                }}
            />
        </SafeAreaView>
    );
}

export default AddGoalFormScreen;