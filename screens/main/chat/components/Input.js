import React, { useCallback, useState, useContext } from 'react'
import { View, TextInput } from 'react-native'

//import { firebaseService } from '../services'
import { UserContext, ChatContext } from '../contexts'

import Button from './custom/Button'
import Loader from './custom/Loader'

import {inputStyles} from '../../../../assets/styles/styles'

export default function Input () {
  const { uid } = useContext(UserContext)
  const chatRef = useContext(ChatContext)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const createMessage = async ({ message, uid, chatRef }) => {
    await chatRef.add({
      message,
      user_id: uid,
      created_at: new Date()
    })
  }

  const handlePress = useCallback(
    function () {
      setIsLoading(true)
      createMessage({ message, uid, chatRef})
        .then(function () {
          setIsLoading(false)
          setMessage('')
        })
    },
    [message]
  )

  return (
    <View style={inputStyles.container}>
      <View style={inputStyles.inputContainer}>
        <TextInput style={inputStyles.input} value={message} onChangeText={setMessage} placeholder="Message" placeholderTextColor='gray'/>
      </View>
      <Button color='#53d681' text="Send" onPress={handlePress} disabled={isLoading} />
      {isLoading && <Loader />}
    </View>
  )
}



