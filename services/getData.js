import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

var db = firestore().collection('Users');

async function getGoalData(uid) {
  var length = 0;
  var goalData = [];
  await db
    .doc(uid)
    .collection('goals')
    .get()
    .then(snap => {
      snap.forEach(currentGoal => {
        let docData = currentGoal.data();
        // console.log(docData);
        let dataObject = {
          title: docData.goalTitle,
          description: docData.goalDescription,
          milestones: docData.goalMilestones,
          accountabuddyId: docData.accountaBuddyId,
          matchedGoalId: docData.matchedGoalId,
          goalId: docData.goalId,
        };
        //add the info to goal data
        goalData.push(dataObject);
      });
    });
  return goalData;
}

export default getGoalData;
