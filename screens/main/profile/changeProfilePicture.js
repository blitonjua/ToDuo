import React, { useContext } from 'react';
import { UserContext } from '../../../services/userContext';

import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import {updateProfileIndex} from './settings';
import { profileIcons } from '../../../assets/images/profileIcons';
import LinearGradient from 'react-native-linear-gradient';
import {settingsScreenStyles} from '../../../assets/styles/styles'

styles = settingsScreenStyles;




function changeProfilePicture({ navigation }) {
    const { user, setUser } = useContext(UserContext);


  const uid = auth().currentUser.uid

  

//item renderer for FlatList
function ListItem({ icon }) {
  return (
      <TouchableOpacity style={{marginHorizontal: 3, marginVertical:2, backgroundColor:"white", borderRadius: 40}} onPress={() => 
        {updateProfileIndex(uid, icon.index);
        navigation.goBack();
      }}>
          <Image source={icon.image} style={{width: 50, height: 50}}/>
      </TouchableOpacity>
  );
}
    

    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#002b54', '#53d681']} style={styles.mainContainer}>
            <View style={styles.secondContainer}>
              <View style={styles.general}>
                <Text style={styles.generalText}>Pick a new profile picture.</Text>
                <FlatList
                    data={profileIcons}
                    numColumns={5}
                    renderItem={({ item }) => <ListItem icon={item} />}
                    keyExtractor={item => item.index.toString()}
                />
            </View>
            <View style={{marginBottom:10}}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.goBack()
                    }
                    }>
                    <Text style={styles.buttonText}> Go Back </Text>
                </TouchableOpacity>
                </View>

            </View>
            </LinearGradient>

    )
}

export default changeProfilePicture;