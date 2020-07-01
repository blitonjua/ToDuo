import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class FirebaseService {
  auth = auth()

  firestore = firestore()

  async createMessage ({ message, uid, chatRef }) {
    await chatRef.add({
      message,
      user_id: uid,
      created_at: new Date()
    })
  }
}
