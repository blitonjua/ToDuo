//firebase
import firestore from '@react-native-firebase/firestore';

const db = firestore();

//updates the status of the provided goal to the provided status
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