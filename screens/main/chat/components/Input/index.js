import React, { useCallback, useState, useContext } from 'react'
import { View, TextInput } from 'react-native'

import { firebaseService } from '../../services'
import { UserContext, ChatContext } from '../../contexts'

import Button from '../common/Button'
import Loader from '../common/Loader'

import styles from './styles'

export default function Input () {
  const { uid } = useContext(UserContext)
  const chatRef = useContext(ChatContext)
  console.log("in index, chatref is " + chatRef)
  //const { tid } = useContext(ToContext)
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Write you message" />
      </View>

      <Button text="Send" onPress={handlePress} disabled={isLoading} />

      {isLoading && <Loader />}
    </View>
  )
}
