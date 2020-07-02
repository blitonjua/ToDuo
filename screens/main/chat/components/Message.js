import React from 'react'
import { View, Text } from 'react-native'

import { StyleSheet } from 'react-native'

export default function Message ({ message, side }) {
  const isLeftSide = side === 'left'

  const containerStyles = isLeftSide ? messageStyles.container : flattenedStyles.container
  const textContainerStyles = isLeftSide ? messageStyles.textContainer : flattenedStyles.textContainer
  const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text style={textStyles}>
          {message}
        </Text>
      </View>
    </View>
  )
}

const messageStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    width: 160,
    backgroundColor: '#B4B4B4',

    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10
  },
  rightContainer: {
    justifyContent: 'flex-end'
  },
  rightTextContainer: {
    backgroundColor: '#5FB0FF',
    marginRight: 10
  },
  leftText: {
    textAlign: 'left'
  },
  rightText: {
    textAlign: 'right'
  },
  text: {
    fontSize: 12
  }
})

const flattenedStyles = {
  container: StyleSheet.flatten([messageStyles.container, messageStyles.rightContainer]),
  textContainer: StyleSheet.flatten([messageStyles.textContainer, messageStyles.rightTextContainer]),
  leftText: StyleSheet.flatten([messageStyles.leftText, messageStyles.text]),
  rightText: StyleSheet.flatten([messageStyles.rightText, messageStyles.text])
}
