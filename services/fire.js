/*
  Various database methods
 */

import firestore from '@react-native-firebase/firestore';
const db = firestore();
//todo this may need some help? is checked when not logged in which leads to error
var goalId = '';
//   userId = auth().currentUser.uid;

// returns data for specified document in collection, used for one time reads
export const readFromDatabase = (collectionName, docName) => {
  console.log("colleciton name is " + collectionName + " and docname is " + docName);
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
