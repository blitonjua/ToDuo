import React, { useEffect, useReducer, useContext } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

//import { firebaseService } from '../../services'
import { UserContext } from './../contexts'

import Input from './Input'
import Message from './Message'

//import { messagesReducer } from './reducers'
import auth from '@react-native-firebase/auth';
import {ChatContext} from './../contexts';

import { unionWith } from 'lodash'

import {chatStyles} from '../../../../assets/styles/styles'

function messagesReducer (state, action) {
  switch (action.type) {
    case 'add':
      return unionWith(state, action.payload, function (a, b) {
        return a.id === b.id
      }).sort(function (a, b) {
        const aData = a.data()
        const bData = b.data()

        return bData.created_at.seconds - aData.created_at.seconds
      })
    default:
      throw new Error('Action type is not implemented!')
  }
}


export default function Chat () {
  const { uid } = useContext(UserContext)
  console.log("chat opened, chatting with " + uid);
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
      <View style={chatStyles.messagesContainer}>
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

      <View style={chatStyles.inputContainer}>
        <Input/>
      </View>
    </SafeAreaView>
  )
}