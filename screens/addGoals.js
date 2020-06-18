import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

function AddGoals({ navigation }) {

    function goToGoals() {
        navigation.navigate('Goals');
    }

    return (
        <View>
            <TouchableOpacity onPress={() => goToGoals()}>
                <Text>Go Back To Goals</Text>

            </TouchableOpacity>

        </View>


    );
}

export default AddGoals