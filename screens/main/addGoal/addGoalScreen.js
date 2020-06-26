import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

//custom imports
import { addGoalToUserGoalCollection } from '../../../services/createGoal';


function AddGoalScreen({ navigation }) {
    //hooks for goal creation
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [milestone1, setMilestone1] = useState('');
    const [milestone2, setMilestone2] = useState('');
    const [milestone3, setMilestone3] = useState('');
    const [submitted, setSubmitted] = useState(false);
    //devtesting goal-categories branch
    // const [category, setCategory] = useState('');

    //creates a goal and adds it to the database
    function addGoalHandler() {
        addGoalToUserGoalCollection(
            auth().currentUser.uid,
            title,
            description,
            [milestone1, milestone2, milestone3],
        );
        setSubmitted(true);
    };

    //sets title
    function titleHandler(enteredTitle) {
        setTitle(enteredTitle);
    }

    //sets description
    function descriptionHandler(enteredDescription) {
        setDescription(enteredDescription);
    }

    //sets milestone1
    function milestone1Handler(enteredMilestone) {
        setMilestone1(enteredMilestone);
    }

    //sets milestone2
    function milestone2Handler(enteredMilestone) {
        setMilestone2(enteredMilestone);
    }

    //sets milestone3
    function milestone3Handler(enteredMilestone) {
        setMilestone3(enteredMilestone);
    }

    // // completely for devtesting goal-categories branch
    // function categoryHander(enteredCategory) {
    //     switch (enteredCategory){
    //         case '1': setCategory(enteredCategory);
    //         case '2': setCategory(enteredCategory);
    //         case '3': setCategory(enteredCategory);
    //         case '': setCategory(enteredCategory);
    //     }
    // }

    return (
        <SafeAreaView>
            {!submitted ? (
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>
                            Go Back because you don't know what your goal is lame-o
                        </Text>
                    </TouchableOpacity>

                    {/* title */}
                    <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="title" onChangeText={titleHandler} value={title} />
                    </View>

                    {/* description */}
                    <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="description" onChangeText={descriptionHandler} value={description} />
                    </View>

                    {/* milestone1 */}
                    <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="milestone1" onChangeText={milestone1Handler} value={milestone1} />
                    </View>

                    {/* milestone2 */}
                    <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="milestone2" onChangeText={milestone2Handler} value={milestone2} />
                    </View>

                    {/* milestone3 */}
                    <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="milestone3" onChangeText={milestone3Handler} value={milestone3} />
                    </View>

                    {/* <View style={{ borderWidth: 1 }}>
                        <TextInput placeholder="1" onChangeText={categoryHander} value={category} />
                    </View> */}

                    {/* add goal Button */}
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

                    <TouchableOpacity onPress={() => navigation.navigate('Plus')}>
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
