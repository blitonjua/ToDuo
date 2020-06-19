import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

function DashboardScreen({ navigation }) {
    function gotoMessage() {
        navigation.navigate('Message');
    };

    function gotoApprove() {
        navigation.navigate('Approve');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <TouchableOpacity onPress={() => gotoMessage()}>
                    <Text>
                        Messages
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