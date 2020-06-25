import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

function ApproveScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Text>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <Text>
                    This is the ApproveScreen
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default ApproveScreen;