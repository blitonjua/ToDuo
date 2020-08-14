import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { getArchivedGoals, getCompletedGoals } from '../../../services/getGoals';
//styles
import { appStyles, devFlatListStyles } from '../../../assets/styles/styles';
const styles = appStyles;

//displays the past goals of the user
function PastGoalsScreen({ navigation }) {
    const [showingCompleted, setShowingCompleted] = useState(false);
    const [goals, setGoals] = useState();

    async function getGoals(showingCompleted) {
        let goals;
        if (showingCompleted)
            goals = await getArchivedGoals();
        else
            goals = await getCompletedGoals();
        setGoals(goals);
      }
    
      useEffect(() => {
        getGoals(showingCompleted);
        navigation.setOptions({ title: showingCompleted? 'Archived Goals' : 'Completed Goals'});
      }, [showingCompleted]);

    //renders the items in the list
    function ListItem({ item }) {
        return (
            <View style={devFlatListStyles.ListItem}>
                <Text style={devFlatListStyles.ListItemText}>{item.title}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>

                {/* toggle completed */}
                <TouchableOpacity onPress={() => {setShowingCompleted(!showingCompleted)}}>
                    <Text style={{fontFamily:'BloggerSans-Bold',color: '#53d681', fontSize: 20}}>
                        {showingCompleted? 'Show Completed' : 'Show Archived'}
                    </Text>
                </TouchableOpacity>

                {/* display list of past goals */}
                <FlatList
                    data={goals}
                    renderItem={({ item }) => <ListItem item={item} />}
                    keyExtractor={item => item.goalId} />
            </View>
        </SafeAreaView>
    )
}

export default PastGoalsScreen;