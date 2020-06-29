import React, { useEffect, useReducer, useContext } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { firebaseService } from '../../services'
import { UserContext } from '../../contexts'

import Input from '../Input'
import Message from '../Message'

import { messagesReducer } from './reducers'
import { chatRoomStyles as styles } from '../../styles'

import auth from '@react-native-firebase/auth';
import {ChatContext} from '../../contexts';

export default function HooksExample () {
  const { uid } = useContext(UserContext)
  console.log(uid);
  //const {uid} = auth().currentUser;
  const [messages, dispatchMessages] = useReducer(messagesReducer, [])
  console.log("printed 1")
  console.log("context is " + ChatContext);
  const chatRef = useContext(ChatContext);
  console.log("printed 2")
  useEffect( //changed from funciotn () {} //change target database here
     () => {
      return chatRef.orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs })
        })
    },
    []
  )

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            return item.id
          }}
          renderItem={function ({ item }) {
            const data = item.data()
            const side = data.user_id === uid ? 'right' : 'left'
            return (
              <Message side={side} message={data.message} />
            )
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input/>
      </View>
    </SafeAreaView>
  )
}
