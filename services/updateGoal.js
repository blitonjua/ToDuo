//firebase
import firestore from '@react-native-firebase/firestore';
//constants
import { status } from './universalConstants';

const db = firestore();
export function updateStatus(userID, goalID, status) {
    db
        .collection('Users')
        .doc(userID)
        .collection('goals')
        .doc(goalID)
        .update({
            status: status
        });
}