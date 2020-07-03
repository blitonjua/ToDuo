import React from 'react';
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    View,
} from 'react-native';

//styles
import { appStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//a screen to display that the app is still searching for a matching for the user
function SearchingScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                {/* back button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('goalsListScreen')}>
                    {/* // onPress={() => navigation.goBack()}> */}
                    <Text>Go Back</Text>
                </TouchableOpacity>

                {/* message */}
                <Text>Hey! We're still finding you a buddy. Please wait :)</Text>

            </View>
        </SafeAreaView>
    );
}

export default SearchingScreen;