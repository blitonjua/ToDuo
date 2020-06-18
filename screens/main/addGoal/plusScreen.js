import React from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native'

function PlusScreen({ navigation }) {
    function gotoAddGoalForm() {
        navigation.navigate('Add Goals');
    }

    return(
        <SafeAreaView  style={styles.main}>
            <TouchableOpacity 
                onPress={() => gotoAddGoalForm()}
                style={styles.button}>
                <Text style={styles.plus}>
                    +
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 160,

    },  
    plus: {
        fontSize: 300,
    }
})

export default PlusScreen;