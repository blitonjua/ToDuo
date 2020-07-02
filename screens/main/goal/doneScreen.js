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
function DoneScreen({ route, navigation }) {
    const status = route.params.status;
    //brings user back to goalsListScreen
    function gotoGoalsListScreen() {
        navigation.navigate('goalsListScreen');
    }

    //displays different message depending on status
    function DoneMessage() {
        if (status == 'completed')
            return (<Text>CONGRATULATIONS!!!!!! YOU'VE ACHIEVED YOUR GOAL!!!!!</Text>);
        if (status == 'archived')
            return (<Text>wow.... lame.</Text>);
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <DoneMessage />
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

export default DoneScreen;