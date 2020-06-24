import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { COLLECTIONS } from '../constants';

export default class FirebaseService {
  auth = auth()

  firestore = firestore()

  messageRef = this.firestore.collection(COLLECTIONS.MESSAGES);

  async signIn () {
    try {
      const response = await this.auth.signInAnonymously()
      return { user: response.user }
    } catch (error) {
      return { error }
    }
  }

  async fetchMessages () {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage ({ message, uid, tid }) {
    await this.messageRef.add({
      message,
      user_id: uid,
      to_id: tid,
      created_at: new Date()
    })
  }
}
