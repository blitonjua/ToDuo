import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
const goalIndex = 0,
  userIndex = 1;
var goalId = '',
  userId = '',
  otherGoal = '',
  otherUser = '';
var category = '';
var waitingRoom;

export const setCategory = (cat) => {
  category = cat;
  waitingRoom = db
    .collection('waitingRoom')
    .doc(cat)
    .collection('goals');
}

export const matchGoals = (id, uid) => {
  goalId = id;
  userId = uid;

  //add goal to waiting room collection
  addGoalToWaitingRoom();
  //listen for when there are 2 goals in waiting room and match them
  // matchTheUsersAndUpdateCollection();
  matchUsersUpdateCollection();
};

//adds goal to the waiting room
const addGoalToWaitingRoom = () => {
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
  let match = await matchUsers('<');
  if (match.length == 0)
    match = await matchUsers('>');
  
  //if match found
  if (match.length > 0) {
    otherGoal = match[0].goalId;
    otherUser = match[0].userId;
  }
  console.log(otherGoal, otherUser)
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
  console.log(match.length)
  return match;
}



const matchTheUsersAndUpdateCollection = () => {
  //this goes to onResult upon continuously checking any collection change, onError on error TODO comment edtiqeutte
  let result = waitingRoom
    .where('userId', '<', goalId)
    // .where('userId', '>', goalId)
    .limit(1)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console
      })
    })
  console.log(result)

  // result.onSnapshot(onResult, onError);
};

// to be ran on successful snapshot
function onResult(QuerySnapshot) {
  var x = 0,
    y = 0;
  // let goals = [];
  // let users = [];


  console.log('\n\nBEGIN')

  //matching goals
  /*QuerySnapshot.forEach(doc => {
    goals[x++] = doc.id;
    users[y++] = doc.data().userId;
  });*/
  QuerySnapshot.forEach(doc => {
  })

  if (x > 1) {
    console.log("got to before if statement");
    //if the number of goals are equal to 2, then update their matched Goal id, accountabuddy id and take them off the waiting room
    //update the original goal fields
    console.log(goals);
    if (goalId == goals[0]) {
      console.log("got to before first promise");
      db.collection('ChatRooms').add({
        exists: true, //todo
      }).then(documentRef => { updateMatchFields(goals, users, documentRef.id) });
    }
  }
}

// to be ran on failed snapshot
function onError(error) {
  console.error(error);
}

// delete the goal doc from the collection
const deleteGoalFromDocument = goalId1 => {
  waitingRoom
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
  console.log("inside second promise, boutta go in third");
  waitingRoom
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
      //see if this deletes extra chatrooms, it does
      db.collection('ChatRooms')
        .doc(chatID)
        .delete();
    })
    .catch(err => {
      console.log('Error getting snapshot', err);
    });
};
