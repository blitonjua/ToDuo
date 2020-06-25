import React from 'react';
import { 
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native'
import { plusStyles } from '../../../assets/styles/styles';
const styles = plusStyles;

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

export default PlusScreen;