import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {matchGoals} from './matchGoals';

var db = firestore().collection('Users');

var length = 0;
var goalData = [];

async function getGoalData(uid) {
  db.doc(uid)
    .collection('goals')
    .get()
    .then(snap => {
      snap.forEach(currentGoal => {
        let docData = currentGoal.data();
        //update number of goals the user has
        length++;
        //get all the info about each goal
        let title = docData.goalTitle,
          description = docData.goalDescription,
          milestones = docData.goalMilestones,
          accountabuddyId = docData.accountaBuddyId,
          matchedGoalId = docData.matchedGoalId;

        //add the info to goal data
        goalData.push([
          title,
          description,
          milestones,
          accountabuddyId,
          matchedGoalId,
        ]);
      });
    });
  console.log('length outside the function: ' + length);
  return [await length, await goalData];
}

export default getGoalData;
