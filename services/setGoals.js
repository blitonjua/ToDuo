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
  //creating the user's blacklist value
  const blacklistedUser = {};
  blacklistedUser[user] = true;

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
      blacklist: blacklistedUser,
    })
    .then(docRef => {
      //add the goal id to current user
      userDoc
        .collection('goals')
        .doc(docRef.id)
        .update({ goalId: docRef.id });

      //match the goals
      matchGoals(docRef.id, blacklistedUser);
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
function matchGoals(id, blacklist) {
  goalId = id;

  //add goal to waiting room
  addGoalToWaitingRoom();
  //match goals when goals from 2 different users are in a waiting room
  matchUsersUpdateCollection(blacklist);
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
async function matchUsersUpdateCollection(blacklist) {
  //find match
  match = await matchUsers(blacklist);

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
async function matchUsers(blacklist) {
  var match = [];
  await waitingRoom
    .get()
    .then(snap => {
      snap.forEach(doc => {
        let docData = doc.data();
        if (!(blacklist[docData.userId] == true)) {
          true;
          let dataObject = {
            goalId: docData.goalId,
            userId: docData.userId,
          };
          match.push(dataObject);
        }          
      });
    });
  return match;
}

//updates the fields of both goals
async function updateCollection(chatId) {
  //updating this user's goal
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
  //updating user's blacklist
  const blacklistedUser = { ...goal.blacklist };
  blacklistedUser[goal.accountaBuddyId] = true;
  //resetting goal's fields
  userDoc
    .collection('goals')
    .doc(goal.goalId)
    .update({
      status: status.matching,
      accountaBuddyId: '',
      matchedGoalId: '',
      chatRoomId: '',
      blacklist: goal.blacklist.concat([goal.accountaBuddyId]),
    })
  setCategory(goal.category);
  //match to another user
  matchGoals(goal.goalId, blacklistedUser);
}