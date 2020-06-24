import React, { useCallback, useState, useContext } from 'react'
import { View, TextInput } from 'react-native'

import { firebaseService } from '../../services'
import { UserContext, ToContext } from '../../contexts'

import Button from '../common/Button'
import Loader from '../common/Loader'

import styles from './styles'

export default function Input () {
  const { uid } = useContext(UserContext)
  const { tid } = useContext(ToContext)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePress = useCallback(
    function () {
      setIsLoading(true)
      firebaseService
        .createMessage({ message, uid, tid})
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
