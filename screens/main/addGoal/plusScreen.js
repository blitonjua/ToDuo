import React from 'react';
import { 
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native'
//styles
import { plusStyles } from '../../../assets/styles/styles';
const styles = plusStyles;

//a nice big plus to our app
function PlusScreen({ navigation }) {
    return(
        <SafeAreaView  style={styles.main}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('categoryScreen')}
                style={styles.button}>
                <Text style={styles.plus}>
                    +
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default PlusScreen;