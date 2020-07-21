import React from 'react';
import Chat from '../chat/components/Chat';
import auth from '@react-native-firebase/auth';
import { UserContext, ChatContext } from '../chat/contexts'
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
//to read buddy data
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

//styles
import { appStyles } from '../../../assets/styles/styles'
styles = appStyles;

//user can send messages to their accountabuddy here
function MessageScreen({ route, navigation }) {

  const { goal } = route.params;

  //buddy name
  useFocusEffect(() => {
    firestore().collection("Users").doc(goal.params.goal.accountaBuddyId).get().then((docSnap) => {
      navigation.setOptions({ title: docSnap.data().firstName });
    });
  }, [route]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/*TODO need to figure out way to remove tabs in chat*/}
      {/* messaging */}
      <ChatContext.Provider
        value={
          firestore()
            .collection('ChatRooms')//make this cleaner, very jank
            .doc(goal.params.goal.chatRoomId)
            .collection('messages')
        }>
      <UserContext.Provider value={auth().currentUser}>
        <Chat />
      </UserContext.Provider>
      </ChatContext.Provider>
    </SafeAreaView>
  );
}

export default MessageScreen;
