import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    Settings,
} from 'react-native';

function SettingsScreen({ navigation }) {
    return(
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text> Go Back </Text>
            </TouchableOpacity>
            <Text>
                This is the SettingsScreen
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default SettingsScreen;