import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//style
import { appStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//a screen that congratulates the user upon completing a goal
function CongratulationsScreen({ navigation }) {
    //brings user back to goalsListScreen
    function gotoGoalsListScreen() {
        navigation.navigate('goalsListScreen');
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <Text> CONGRATULATIONS!!!!!! YOU'VE ACHIEVED YOUR GOAL!!!!!</Text>
                <TouchableOpacity
                    onPress={() => gotoGoalsListScreen()}>
                    <Text>
                        Go Home
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CongratulationsScreen;