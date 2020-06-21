import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import getGoalData from '../../../services/getData';
import {FlatList} from 'react-native-gesture-handler';

function goalsListScreen({navigation}) {
  const [goalData, setGoalData] = useState([]);
  let uid = auth().currentUser.uid;

  async function getGoals() {
    let data = await getGoalData(uid);
    return data;
  }

  const setData = () => {
    getGoals().then(function(val) {
      setGoalData(val);
    });
  };

  function Item({id, title, selected, onSelect}) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          {backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'},
        ]}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  setData();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* add the flat list */}
        <Text>This is the goals list</Text>
        <FlatList
          data={goalData}
          renderItem={({item}) => (
            <Item
              id={item.id}
              title={item.title}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('dashBoard');
          }}>
          <Text>Go to DashBoard</Text>
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

export default goalsListScreen;
