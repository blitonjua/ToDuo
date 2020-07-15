//constants
import { status } from './universalConstants';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
const usersCollection = db.collection('Users');
var userId = '';
var userDoc = '';
var goalId = '',
  otherGoal = '',
  otherUser = '';
var waitingRoom;

//creates a goal and adds it to the user's goal collection
export function addGoalToUserGoalCollection(
  user,
  goalTitle,
  goalDescription,
  goalMilestones,
  goalCategory,
) {
  //create a document with auto generated ID and add title, description and milestones.
  setCategory(goalCategory);
  setUserConsts(user);
  userDoc
    .collection('goals')
    .add({
      goalTitle: goalTitle,
      goalDescription: goalDescription,
      goalMilestones: goalMilestones,
      userId: userId,
      status: status.matching,
      category: goalCategory,
    })
    .then(docRef => {
      //add the goal id to current user
      userDoc
        .collection('goals')
        .doc(docRef.id)
        .update({ goalId: docRef.id });

      //match the goals
      matchGoals(docRef.id, goalCategory);
    });
}

//sets the category for the goal
function setCategory(category) {
  waitingRoom = db
    .collection('WaitingRooms')
    .doc(category)
    .collection('goals');
}

//sets the constatns for this file
function setUserConsts(user) {
  userId = auth().currentUser.uid;
  userDoc = usersCollection.doc(userId);
}

//matches the goals of two different users in the same waitingRoom
function matchGoals(id) {
  goalId = id;

  //add goal to waiting room
  addGoalToWaitingRoom();
  //match goals when goals from 2 different users are in a waiting room
  matchUsersUpdateCollection();
}

//adds goal to the waiting room
function addGoalToWaitingRoom() {
  waitingRoom.doc(goalId).set({
    goalId: goalId,
    userId: userId,
    accountaBuddyId: '',
    matchedGoalId: '',
  });
}

//matches users and updates the database with the match data
async function matchUsersUpdateCollection() {
  //find match
  let match = await matchUsers('<');
  if (match.length == 0) match = await matchUsers('>');

  console.log('MATCH: ', match)

  //if match found
  if (match.length > 0) {
    otherGoal = match[0].goalId;
    otherUser = match[0].userId;

    //update collection
    await db
      .collection('ChatRooms')
      .add({
        exists: true, //todo
      })
      .then(documentRef => {
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
        let docData = doc.data();
        let dataObject = {
          goalId: docData.goalId,
          userId: docData.userId,
        };
        match.push(dataObject);
      });
    });
  return match;
}

//updates the fields of both goals
async function updateCollection(chatId) {
  //updating this user's goal
  console.log('other user: ', otherUser)
  console.log('other goal: ', otherGoal)

  await userDoc
    .collection('goals')
    .doc(goalId)
    .update({
      accountaBuddyId: otherUser,
      matchedGoalId: otherGoal,
      chatRoomId: chatId,
      status: status.inProgress, //TODO: once stage 2 implemented, change to status.planning
    });

  //updating matched user's goal
  await usersCollection
    .doc(otherUser)
    .collection('goals')
    .doc(otherGoal)
    .update({
      accountaBuddyId: userId,
      matchedGoalId: goalId,
      chatRoomId: chatId,
      status: status.inProgress, //TODO: once stage 2 implemented, change to status.planning
    });

  console.log('ready to remove')
  //remove goals from waiting room
  removeGoals(goalId);
  removeGoals(otherGoal);

  //see if this deletes extra chatrooms, it does
  await db
    .collection('ChatRooms')
    .doc(chatId)
    .delete();
}

//removes specified goal from the waiting room
function removeGoals(goal) {
  waitingRoom.doc(goal).delete();
}

//updates the status of the provided goal to the provided status
export function updateStatus(user, goalID, status) {
  setUserConsts(user);
  userDoc
    .collection('goals')
    .doc(goalID)
    .update({
      status: status,
    });
}

//allows the user to leave the partnership with an accountabuddy
export function bailPartnership(user, goal) {
  setUserConsts(user);
  //resetting goal's fields
  userDoc
    .collection('goals')
    .doc(goal.goalId)
    .update({
      status: status.matching,
      accountaBuddyId: '',
      matchedGoalId: '',
      chatRoomId: '',
    })
  setCategory(goal.category);
  //match to another user
  console.log('USER: ', user)
  console.log('GOAL: ', goal.category)
  // console.log('WAITING: ', waitingRoom)

  matchGoals(goal.goalId)
}