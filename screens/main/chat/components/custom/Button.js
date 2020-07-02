import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { StyleSheet } from 'react-native'

export default function Button ({ text, disabled, onPress }) {
  return (
    <TouchableOpacity style={buttonStyles.container} onPress={onPress} disabled={disabled}>
      <Text style={buttonStyles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#5FB0FF',
    borderRadius: 3
  },
  text: {
    color: '#FFF'
  }
})
