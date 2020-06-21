import React, {useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData'


function DashboardScreen({ navigation }) {
    const [goalData, setGoalData] = useState([]);
    let uid = auth().currentUser.uid;
    
   
    async function getGoals() {
        let data = await getGoalData(uid);
        return data;
    }

    const setData = () => {
        getGoals().then(function(val) {
            setGoalData(val);
            })
    }
    console.log(goalData);
    
    function gotoMessage() {
        navigation.navigate('Message');
    };

    function gotoApprove() {
        navigation.navigate('Approve');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <TouchableOpacity onPress={() => setData()}>
                    <Text>
                        Set Goals
                    </Text>
                </TouchableOpacity>

                <Text>
                    This is the DashboardScreen. We could consider using a flatlist if dynamic tabs aren't feasible.
                </Text>

                <TouchableOpacity onPress={() => gotoApprove()}>
                    <Text>
                        Approve
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    main: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;