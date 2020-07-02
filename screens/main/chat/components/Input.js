import React, { useCallback, useState, useContext } from 'react'
import { View, TextInput } from 'react-native'

import { firebaseService } from '../services'
import { UserContext, ChatContext } from '../contexts'

import Button from './common/Button'
import Loader from './common/Loader'

import { StyleSheet } from 'react-native'

import { COLORS } from '../styles'

export default function Input () {
  const { uid } = useContext(UserContext)
  const chatRef = useContext(ChatContext)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePress = useCallback(
    function () {
      setIsLoading(true)
      firebaseService
        .createMessage({ message, uid, chatRef})
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
        <TextInput style={inputStyles.input} value={message} onChangeText={setMessage} placeholder="Write you message" />
      </View>

      <Button text="Send" onPress={handlePress} disabled={isLoading} />

      {isLoading && <Loader />}
    </View>
  )
}

const inputStyles =  StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  inputContainer: {
    width: '70%'
  },
  input: {
    height: 40,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10
  }
})

