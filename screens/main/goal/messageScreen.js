import React from 'react';
import HooksExample from '../chat/components/HooksExample';
import auth from '@react-native-firebase/auth';
import { UserContext, ChatContext } from '../chat/contexts'
import firestore from '@react-native-firebase/firestore';
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
function MessageScreen({route, navigation}) {
  const {goal} = route.params;
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {/* back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/*TODO need to figure out way to remove tabs in chat*/}
      {/* messaging */}
      <ChatContext.Provider value={firestore().collection('ChatRooms').doc(goal.params.goal.chatRoomId).collection('messages')}>
      <UserContext.Provider value={auth().currentUser}>
        <HooksExample />
      </UserContext.Provider>
      </ChatContext.Provider>
    </SafeAreaView>
  );
}

export default MessageScreen;
