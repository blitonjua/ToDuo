/*
  Various database methods
 */

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const db = firestore();
<<<<<<< HEAD
=======
//todo this may need some help? is checked when not logged in which leads to error
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
var goalId = '',
  userId = auth().currentUser.uid;

// returns data for specified document in collection, used for one time reads
const readFromDatabase = (collectionName, docName) => {
  let data = db.collection(collectionName.toString()).doc(docName.toString())
    .get;
  return data;
};

// testing method to list out database through a snapshot
export const listOutDatabase = () => {
  console.log('listOut Database');
  db.collection('Users')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
};

//creatres a document with id == uid and adds all the appropriate fields to it
export const addUser = (uid, firstName, lastName, newAge, email) => {
  db.collection('Users')
    .doc(uid)
    .set({
      firstName: firstName,
      lastName: lastName,
      age: newAge,
      email: email,
    })
    .then(ref => {
      console.log(ref);
    });
};

export const matchUser = id => {
  goalId = id;
  // MVP just matches in a queue to avoid synch, def gonna change
  /* var user = auth().currentUser;
    -if ++docs(goals) in collections(room) >= 2
      else wait
    -get 2 goal ids
    -take both goals off waiting room
  */
  addGoalToWaitingRoom();

  //only proceed if current goal is goal [0]
  //todo implement better syn
  //let goaltoGetInfo = goalId == goals[0]? goals[1]: goals[0];
  matchTheUsersAndUpdateCollection();
};

//adds goal to the waiting room
const addGoalToWaitingRoom = () => {
  db.collection('waitingRoom')
    .doc(goalId)
    .set({
      goalId: goalId,
      userId: userId,
      accountaBuddyId: '',
      matchedGoalId: '',
    });
};

//check if there is another goal to match
const matchTheUsersAndUpdateCollection = () => {
  //this goes to onResult upon continuously checking any collection change, onError on error TODO comment edtiqeutte
  db.collection('waitingRoom').onSnapshot(onResult, onError);
};

// to be ran on successful snapshot
function onResult(QuerySnapshot) {
  // todo we need to leave/close/unsubscribe from onSnapshot?
  // still listening, cannot wake up during a wakeup??
  var x = 0,
    y = 0;
  let goals = [];
  let users = [];
  QuerySnapshot.forEach(doc => {
    goals[x++] = doc.id;
    users[y++] = doc.data().userId; //might cause an error if so, change to .data.userId
  });
  if (x > 1) {
    //if the number of goals are equal to 2, then update their matched Goal id, accountabuddy id and take them off the waiting room
    //update the original goal fields
    updateMatchFields(goals, users);
<<<<<<< HEAD

    //take both goals off of waiting room
    // first/delete->[0][1]last
=======
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
  }
}

// to be ran on failed snapshot
function onError(error) {
  console.error(error);
}

<<<<<<< HEAD
// delete the two goal docs from the collection
=======
// delete the goal doc from the collection
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
const deleteGoalFromDocument = goalId1 => {
  db.collection('waitingRoom')
    .doc(goalId1)
    .delete();
};

<<<<<<< HEAD
=======
// updates both
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
const updateMatchFields = (goals, users) => {
  if (goalId == goals[0]) {
    console.log('**********users: ' + users);
    console.log('**********goals:' + goals);
    db.collection('waitingRoom')
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
<<<<<<< HEAD

        /*-----
      console.log("goal 1 id: "+querySnapshot.docs[0].data().goalId);
          db.collection('Users')
          .doc(querySnapshot.docs[0].data().userId)
          .collection('goals')
          .doc(querySnapshot.docs[0].data().goalId)
          .update({
            accountaBuddyId: querySnapshot.docs[1].data().userId,
            matchedGoalId: querySnapshot.docs[1].data().userId,
          });

      console.log("goal 2 id: "+querySnapshot.docs[1].data().goalId);    
          db.collection('Users')
          .doc(querySnapshot.docs[1].data().userId)
          .collection('goals')
          .doc(querySnapshot.docs[1].data().goalId)
          .update({
            accountaBuddyId: querySnapshot.docs[0].data().userId,
            matchedGoalId: querySnapshot.docs[0].data().userId,
      });
      //*/

=======
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
        //removes both documents from waiting room
        deleteGoalFromDocument(goals[0]);
        deleteGoalFromDocument(goals[1]);
      })
      .catch(err => {
        console.log('Error getting snapshot', err);
      });
  }
<<<<<<< HEAD

  ///////
  /*
  let goaltoGetInfo = goalId == goals[0]? goals[1]: goals[0];
  let goalRef = db.collection('waitingRoom').doc(goaltoGetInfo);
  let getDoc = goalRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      // thegoaluser = doc.data().userId
      db.collection('Users')
      .doc(userId)
      .collection('goals')
      .doc(goalId)
      .update({
        goalId: goalId,
        userId: userId,
        accountaBuddyId: doc.data().userId,
        matchedGoalId: doc.data().goalId,
      });

      deleteGoalFromDocument(goalId);
      deleteGoalFromDocument(goaltoGetInfo);
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
  */
};
/* METHODS TO CREATE
  check for partner(find a way to interrupt/notify? listen for database change)
  force partner match/update fields
  get data about the matched goal (after match)
*/
=======
};
>>>>>>> b2a9624d134aab1a24dd14cebdf6942fb2fda4b7
