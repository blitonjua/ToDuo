import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {matchGoals} from './matchGoals';

const usersCollection = firestore().collection('Users');
var goalId = '';

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
    })
    .then(docRef => {
      //add the goal id to current user
      usersCollection
        .doc(userId)
        .collection('goals')
        .doc(docRef.id)
        .update({goalId: docRef.id});

      console.log(goalMilestones);
      for (let i = 0; i < goalMilestones.length; i++) {
        usersCollection
          .doc(userId)
          .collection('goals')
          .doc(docRef.id)
          .collection('milestones')
          .doc(goalMilestones[i])
          .set({
            milestoneText: goalMilestones[i],
            milestoneStatus: false,
            milestoneDeadline: goalMilestones[1],
          });
      }

      //match the goals
      matchGoals(docRef.id, auth().currentUser.uid, goalCategory);
    });
};
