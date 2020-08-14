import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//constants
import { status } from '../../../services/universalConstants';
//style
import { appStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//a screen that congratulates the user upon completing a goal
function DoneScreen({ route, navigation }) {
    const stat = route.params.status;
    //brings user back to goalsListScreen
    function gotoGoalsListScreen() {
        navigation.navigate('goalsListScreen');
    }

    //displays different message depending on status
    function DoneMessage() {
        if (stat == status.completed)
            return (<Text style={{color: 'white', fontFamily:'BloggerSans-Medium'}}>Congratulations on completing your goal! Woohoo!</Text>);
        if (stat == status.archived)
            return (<Text style={{color: 'white', fontFamily:'BloggerSans-Medium'}}>Work hard to finish your goal next time!</Text>);
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <DoneMessage />
                <TouchableOpacity
                    onPress={() => gotoGoalsListScreen()}
                    style={{backgroundColor: '#53d681',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        padding: 10,
                        margin: 10}}>
                    <Text
                        style={{color: 'white', fontFamily:'BloggerSans-Medium'}}>
                        Go Home
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default DoneScreen;