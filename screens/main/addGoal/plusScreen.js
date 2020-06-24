import React from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native'

function PlusScreen({ navigation }) {
    return(
        <SafeAreaView  style={styles.main}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Categories')}
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