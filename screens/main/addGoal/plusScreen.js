import React from 'react';
import { 
    SafeAreaView,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform,
} from 'react-native'
//styles
import { plusStyles } from '../../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
const styles = plusStyles;

//a nice big plus to our app
function PlusScreen({ navigation }) {
    return(
        <SafeAreaView  style={styles.main}>
            <StatusBar barStyle={Platform.OS === 'ios'? 'light-content':'default'} backgroundColor='black'/>
            <TouchableOpacity 
                onPress={() => navigation.navigate('categoryScreen')}
                style={styles.button}>
                <Ionicons name={'ios-add-circle-outline'} size={200} color={'#ffffff'} />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default PlusScreen;