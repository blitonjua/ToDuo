//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//constants
import { status } from './universalConstants';

var db = firestore().collection('Users');
var goals;

//returns list of displayable goals
export async function getDisplayableGoals() {
  await getGoals();
  return goals.filter(checkDisplayable);
}

//returns list of completed goals
export async function getCompletedGoals() {
  await getGoals();
  return goals.filter(checkCompleted);
}

//returns a list of archived goals
export async function getArchivedGoals() {
  await getGoals();
  return goals.filter(checkArchived);
}
//set goals to the user's goals and all associated data
async function getGoals() {
  if (auth().currentUser) {
    // console.log('\n\n\nGETGOALS');
    let uid = auth().currentUser.uid;
    await getGoalData(uid);
  }
}

//retrieve data on user's goals
async function getGoalData(uid) {
  var goalData = [];
  await db
    .doc(uid)
    .collection('goals')
    .get()
    .then(snap => {
      snap.forEach(currentGoal => {
        let docData = currentGoal.data();
        let dataObject = {
          title: docData.goalTitle,
          description: docData.goalDescription,
          milestones: docData.goalMilestones,
          accountaBuddyId: docData.accountaBuddyId,
          matchedGoalId: docData.matchedGoalId,
          goalId: docData.goalId,
          chatRoomId: docData.chatRoomId,
          status: docData.status,
        };
        //add the info to goal data
        goalData.push(dataObject);
      });
    });
  goals = goalData;
}

//checks whether goal is displayable according to goal's status
function checkDisplayable(goal) {
  return goal.status < status.goalListDisplayable;
}

//checks whether goal is completed
function checkCompleted(goal) {
  return goal.status < status.completed;
}

//checks whether goal is completed
function checkArchived(goal) {
  return goal.status < status.archived;
}