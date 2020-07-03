import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import {loaderStyles} from '../../../../../assets/styles/styles'

export default function Loader () {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator animating color={'#5FB0FF'} size="small"/>
    </View>
  )
}


