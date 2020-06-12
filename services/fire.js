/*
  Various database methods
 */

import firestore from '@react-native-firebase/firestore';


const db = firestore();

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
 
 export const matchUser=(goalId)=>{
  console.log("you are lookign at match user functions")
  // ASK MICHAEL ABOUT DATABASE SYNCHRONIZATION
  // MVP just matches in a queue to avoid synch
  /* var user = auth().currentUser;
    -if ++docs(goals) in collections(room) >= 2
      else wait
    -get 2 goal ids
    -to shirk synchronization resposibilities for mvp, match first come first serve
    -update accountabuddy field with the matched user id x2
      ----
        goal : user id, goal id, accountabuddy id, matched goal id, title, etc
        goal -> waiting room -> goal id
        update: accountabuddy id, matched goal id x2
        go to user collections-> find the accountabuddy using the goal's accountabuddy id
        goals array-> use the matched goal id to find the matching goal

        toDuo--app--apid1--userid--userid2--goalid2--goalid1
        
        sc--app--apid2--userid2--userid--goalid1--goalid2
      ----
    -take both goals off waiting room
  */

  addGoalToWaitingRoom(goalId);
  matchTheUsersAndUpdateCollection();
};
//adds goal to the waiting room
const addGoalToWaitingRoom=(goalId)=>{
  db.collection('waitingRoom').doc(goalId).set({
    goalId:goalId
  });
};

function onResult(QuerySnapshot) { // do we need to leave/close/unsubscribe from onSnapshot?
  console.log('Got goals collection result.');
  var x = 0;
  let goals=[];
  QuerySnapshot.forEach(documentSnapshot=>{
    console.log('hey');
    goals[x++]=documentSnapshot.Id;
  });
  if (x>1){ //if the number of goals are equal to 2, then update their matched Goal id, accountabuddy id and take them off the waiting room
    //update the goal fields

    //take both goals off of waiting room
  }
}

function onError(error) {
  console.error(error);
}

//check if there is another goal to match, if so, take them both away from 
const matchTheUsersAndUpdateCollection =()=>{
    db
    .collection('waitingRoom')
    .onSnapshot(onResult, onError); //this goes to onResult upon continuously checking any collection change, onError on error

    /*
    num= onsnapshot(getlength of collection)    // returns the number of docs in waiting rooms

      if(num>1)
        wait until num>1   
      
      take out both users

      return a boolean  (true=goals are taken off of the collection)
    */
};


const updateMatchFields = () => {

};


/* METHODS TO CREATE
  add self user to waiting rooms
  check for partner(find a way to interrupt/notify? listen for database change)
  force partner match/update fields
  delete the 2 goals from waiting rooms

  get data about the matched goal (after match)
*/

