import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {matchGoals} from './matchGoals';

const usersCollection = firestore().collection('Users');
var goalId = '';

export const addGoalToUserGoalCollection = (
  userId,
  goalTitle,
  goalDescription,
  goalCategory,
  goalMilestones,
  datesPicked,
) => {
  console.log('beginning of fucntiuon ' + datesPicked);
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
      console.log('in doc ' + datesPicked);
      for (let i = 0; i < goalMilestones.length; i++) {
        let currentMilestone = goalMilestones[i];
        let currentDeadline = datesPicked[i];
        console.log('dates:' + currentDeadline);
        usersCollection
          .doc(userId)
          .collection('goals')
          .doc(docRef.id)
          .collection('milestones')
          .doc(goalMilestones[i])
          .set({
            milestoneText: currentMilestone,
            milestoneStatus: false,
            milestoneMonth: currentDeadline[0],
            milestoneDay: currentDeadline[1],
            milestoneFullYear: currentDeadline[2],
            milestoneDeadlineValue: currentDeadline[3],
          });
      }

      //match the goals
      matchGoals(docRef.id, auth().currentUser.uid, goalCategory);
    });
};
