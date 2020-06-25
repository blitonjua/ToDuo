import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
var goalId = '',
  userId = '';

export const matchGoals = (id, uid) => {
  goalId = id;
  userId = uid;

  //add goal to waiting room collection
  addGoalToWaitingRoom();
  //listen for when there are 2 goals in waiting room and match them
  matchTheUsersAndUpdateCollection();
};

//adds goal to the waiting room
const addGoalToWaitingRoom = () => {
  db.collection('waitingRoom')
    .doc(goalId)
    .set({
      goalId: goalId,
      userId: auth().currentUser.uid,
      accountaBuddyId: '',
      matchedGoalId: '',
    });
};

const matchTheUsersAndUpdateCollection = () => {
  //this goes to onResult upon continuously checking any collection change, onError on error TODO comment edtiqeutte
  db.collection('waitingRoom').onSnapshot(onResult, onError);
};

// to be ran on successful snapshot
function onResult(QuerySnapshot) {
  var x = 0,
    y = 0;
  let goals = [];
  let users = [];
  QuerySnapshot.forEach(doc => {
    goals[x++] = doc.id;
    users[y++] = doc.data().userId;
  });
  if (x > 1) {
    console.log("got to before if statement");
    //if the number of goals are equal to 2, then update their matched Goal id, accountabuddy id and take them off the waiting room
    //update the original goal fields
    console.log(goals);
    if (goalId == goals[0]) {
      console.log("got to before first promise");
      // let chatRef = db.collection('ChatRooms').add({
      //   exists: true, //todo
      // });
      // console.log("got to before second promise");
      // chatRef.then(updateMatchFields(goals, users, chatRef.id));
      db.collection('ChatRooms').add({
        exists: true, //todo
      }).then(documentRef => {updateMatchFields(goals, users, documentRef.id)});
    }
  }
}

// to be ran on failed snapshot
function onError(error) {
  console.error(error);
}

// delete the goal doc from the collection
const deleteGoalFromDocument = goalId1 => {
  db.collection('waitingRoom')
    .doc(goalId1)
    .delete();
};

// //creates a chatroom when pair is found, returns chatroomid
// async function makeChatRoom() {
//   return await db.collection('ChatRooms').add({
//     holder: 'messages' //todo
//   }).id;
// }

// updates both
const updateMatchFields = (goals, users, chatID) => {
  // if (goalId == goals[0]) {
    console.log('**********users: ' + users);
    console.log('**********goals:' + goals);
    console.log('chat ID is ' + chatID);
    console.log("inside second promise, boutta go in third");
    db.collection('waitingRoom')
      .get()
      .then(querySnapshot => { 
        console.log("now in the resultion of the third");
        console.log("chatID is " + chatID);       
        let i = 0;
        querySnapshot.forEach(currentGoalDoc => {
          db.collection('Users')
            .doc(users[i])
            .collection('goals')
            .doc(goals[i])
            .update({
              accountaBuddyId: users[!i + 0],
              matchedGoalId: goals[!i + 0],
              chatRoomId: chatID,
            });
          i++;
        });
        //removes both documents from waiting room
        deleteGoalFromDocument(goals[0]);
        deleteGoalFromDocument(goals[1]);
      })
      .catch(err => {
        console.log('Error getting snapshot', err);
      });
  //}
};
