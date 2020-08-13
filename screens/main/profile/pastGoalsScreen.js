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
        navigation.setOptions({ title: showingCompleted? 'Completed Goals' : 'Archived Goals'});
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
                <TouchableOpacity style={styles.wideButton} onPress={() => {setShowingCompleted(!showingCompleted)}}>
                    <Text>
                        {showingCompleted? 'Show Archived' : 'Show Completed'}
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