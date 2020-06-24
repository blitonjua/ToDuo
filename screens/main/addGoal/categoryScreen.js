import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Flatlist,
    Text,
} from 'react-native';

//custom imports
import { categories } from '../../../services/universalVariables';
import { FlatList } from 'react-native-gesture-handler';
import { setCategory } from '../../../services/matchGoals';

function CategoryScreen({ navigation }) {

    function handlePress(title) {
        setCategory(title);
        navigation.navigate('Add Goals');
    }

    //item renderer for FlatList
    function ListItem({ title }) {
        return (
            <View style={{backgroundColor: 'gray', borderWidth: 1}}>
                <TouchableOpacity onPress={() => handlePress(title)}>
                    <Text>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView>
            {/* back button */}
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text>
                    Press here to go goBack
                </Text>
            </TouchableOpacity>

            <Text>Pick a category:</Text>
            
            <FlatList
                data={categories}
                renderItem={({ item }) => <ListItem title={item.title} />}
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    )
}

export default CategoryScreen;