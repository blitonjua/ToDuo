import React, { useState } from 'react';
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


function AddGoalScreen({ navigation }) {
    // listOutDatabase();
    const addGoalHandler = title => {
        addGoalToUserGoalCollection(
            auth().currentUser.uid,
            title,
            'description',
            ['milestone1', 'milestone2', 'milestone3'],
        );
        setSubmitted(true);
    };

    //hooks for goal creation
    const [title, setTitle] = useState('');
    const [submitted, setSubmitted] = useState(false);

    //sets the state to the goal title
    function titleHandler(enteredTitle) {
        setTitle(enteredTitle);
    }

    return (
        <SafeAreaView>
            {!submitted ? (
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>
                            Go Back because you don't know what your goal is lame-o
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addGoalHandler()}>
                        <Text>Add Goal</Text>
                    </TouchableOpacity>

                    <View style={{ borderWidth: 1 }}>
                        <TextInput onChangeText={titleHandler} value={title} />
                    </View>

                    <Text>{title}</Text>
                    <Button
                        title="+"
                        onPress={() => addGoalHandler()}
                    />
                </View>
            ) : (
                <View>
                    <Text>
                        Goal Added! This will be some confirmation text.
                    </Text>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

export default AddGoalScreen;