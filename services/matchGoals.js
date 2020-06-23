import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
var goalId = '',
  userId = '';
var category = '';

export const matchGoals = (id, uid, cat) => {
  goalId = id;
  userId = uid;
  category = cat;

  //add goal to waiting room collection
  addGoalToWaitingRoom();
  //listen for when there are 2 goals in waiting room and match them
  matchTheUsersAndUpdateCollection();
};

//adds goal to the waiting room
const addGoalToWaitingRoom = () => {
  db.collection('waitingRoom')
    .doc(category)
    .collection('goals')
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
  db.collection('waitingRoom')
    .doc(category)
    .collection('goals')
    .onSnapshot(onResult, onError);
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
    //if the number of goals are equal to 2, then update their matched Goal id, accountabuddy id and take them off the waiting room
    //update the original goal fields
    updateMatchFields(goals, users);
  }
}

// to be ran on failed snapshot
function onError(error) {
  console.error(error);
}

// delete the goal doc from the collection
const deleteGoalFromDocument = goalId1 => {
  db.collection('waitingRoom')
    .doc(category)
    .collection('goals')
    .doc(goalId1)
    .delete();
};

// updates both
const updateMatchFields = (goals, users) => {
  if (goalId == goals[0]) {
    db.collection('waitingRoom')
      .doc(category)
      .collection('goals')
      .get()
      .then(querySnapshot => {
        let i = 0;
        querySnapshot.forEach(currentGoalDoc => {
          db.collection('Users')
            .doc(users[i])
            .collection('goals')
            .doc(goals[i])
            .update({
              accountaBuddyId: users[!i + 0],
              matchedGoalId: goals[!i + 0],
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
  }
};
