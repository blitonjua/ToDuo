//constants
import { status } from './universalConstants';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { matchGoals } from './matchGoals';

const usersCollection = firestore().collection('Users');

export const addGoalToUserGoalCollection = (
  userId,
  goalTitle,
  goalDescription,
  goalMilestones,
  goalCategory,
) => {
  //create a document with auto generated ID and add title, description and milestones.
  usersCollection
    .doc(userId)
    .collection('goals')
    .add({
      goalTitle: goalTitle,
      goalDescription: goalDescription,
      goalMilestones: goalMilestones,
      userId: userId,
      status: status.matching,
    })
    .then(docRef => {
      //add the goal id to current user
      usersCollection
        .doc(userId)
        .collection('goals')
        .doc(docRef.id)
        .update({ goalId: docRef.id });

      //match the goals
      matchGoals(docRef.id, auth().currentUser.uid, goalCategory);
    });
};
