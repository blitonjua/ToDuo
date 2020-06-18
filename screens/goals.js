import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

function Goals({ navigation }) {

    function addAGoal() {
        navigation.navigate('Add Goals');
    }

    return (
        <View>
            <TouchableOpacity onPress={() => addAGoal()}>
                <Text>add goals</Text>

            </TouchableOpacity>

        </View>


    );
}

export default Goals