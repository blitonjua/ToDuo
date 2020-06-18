import React from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

function AddGoalFormScreen({ navigation }) {

    function goBack() {
        navigation.navigate('Plus');
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => goBack()}>
                <Text>
                    Go Back because you don't know what your goal is lame-o
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddGoalFormScreen;