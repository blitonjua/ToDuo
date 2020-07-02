import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import {buttonStyles} from '../../../../../assets/styles/styles'

export default function Button ({ text, disabled, onPress }) {
  return (
    <TouchableOpacity style={buttonStyles.container} onPress={onPress} disabled={disabled}>
      <Text style={buttonStyles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

