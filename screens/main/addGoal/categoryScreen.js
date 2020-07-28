import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

//screens
import {categories} from '../../../services/universalConstants';

//styles
import {appStyles, devFlatListStyles} from '../../../assets/styles/styles';
const styles = appStyles;

function CategoryScreen({navigation}) {
  function handlePress(title) {
    navigation.navigate('addGoalScreen', {category: title});
  }

  function ListItem({title}) {
    return (
      <TouchableOpacity onPress={() => handlePress(title)}>
        <View style={devFlatListStyles.ListItem}>
          <Text style={devFlatListStyles.ListItemText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.main}>
                <View style={styles.padding}>
                <Text style={styles.text}>Pick a category for your goal</Text>
                </View>

                {/* categories */}
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <ListItem title={item.title} />}
                    keyExtractor={item => item.title}
                />
            </View>
        </SafeAreaView>
  )
}

export default CategoryScreen;
