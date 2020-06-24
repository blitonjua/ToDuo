import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import Loader from './components/common/Loader'
import HooksExample from './components/HooksExample'

import { UserContext, ToContext } from './contexts'
import { firebaseService } from './services'

//todo added
import auth from '@react-native-firebase/auth';

const ChatLink  {
  //const [user, setUser] = useState(null)

  // useEffect(
  //   function () {
  //     firebaseService.signIn()
  //       .then(({ user, error }) => {
  //         if (error) {
  //           Alert.alert('Something went wrong')
  //           return
  //         }

  //         setUser(user)
  //       })
  //   },
  //   []
  // )

  // if (!user) {
  //   return <Loader />
  // }

  return (
    <UserContext.Provider value={auth().currentUser}>
      <HooksExample />
    </UserContext.Provider>
  )
}

export default ChatLink
