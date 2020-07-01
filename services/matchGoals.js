//constants
import {status} from './universalConstants';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
var goalId = '',
  userId = '',
  otherGoal = '',
  otherUser = '';
var waitingRoom;

//sets the category for the goal
export const setCategory = (cat) => {
  category = cat;
  waitingRoom = db
    .collection('WaitingRooms')
    .doc(cat)
    .collection('goals');
}

export const matchGoals = (id, uid) => {
  goalId = id;
  userId = uid;

  //add goal to waiting room
  addGoalToWaitingRoom();
  //match goals when goals from 2 different users are in a waiting room
  matchUsersUpdateCollection();
};

//adds goal to the waiting room
function addGoalToWaitingRoom() {
  waitingRoom
    .doc(goalId)
    .set({
      goalId: goalId,
      userId: auth().currentUser.uid,
      accountaBuddyId: '',
      matchedGoalId: '',
    });
};

async function matchUsersUpdateCollection() {
  //find match
  let match = await matchUsers('<');
  if (match.length == 0)
    match = await matchUsers('>');

  //if match found
  if (match.length > 0) {
    otherGoal = match[0].goalId;
    otherUser = match[0].userId;

    //update collection
    await db.collection('ChatRooms').add({
      exists: true, //todo
    }).then(documentRef => {
      updateCollection(documentRef.id);
    });
  }
}

//finds another user to match to this goal
async function matchUsers(compare) {
  var match = [];
  await waitingRoom
    .where('userId', compare, userId)
    .limit(1)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        let docData = doc.data()
        let dataObject = {
          goalId: docData.goalId,
          userId: docData.userId,
        };
        match.push(dataObject)
      })
    })
  return match;
}

//updates the fields of both goals
async function updateCollection(chatId) {
  //updating this user's goal
  await db
    .collection('Users')
    .doc(userId)
    .collection('goals')
    .doc(goalId)
    .update({
      accountaBuddyId: otherUser,
      matchedGoalId: otherGoal,
      chatRoomId: chatId,
      status: status.inProgress,
    });

  //updating matched user's goal
  await db
    .collection('Users')
    .doc(otherUser)
    .collection('goals')
    .doc(otherGoal)
    .update({
      accountaBuddyId: userId,
      matchedGoalId: goalId,
      chatRoomId: chatId,
      status: status.inProgress,
    })

  //remove goals from waiting room
  removeGoals(goalId);
  removeGoals(otherGoal);

  //see if this deletes extra chatrooms, it does
  await db.collection('ChatRooms')
    .doc(chatId)
    .delete();
}

//removes specified goal from the waiting room
function removeGoals(goal) {
  waitingRoom
    .doc(goal)
    .delete()
}
