//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';

//constants

var db = firestore().collection('Users');
var user;

export async function getUserData(uid) {
    await db
      .doc(uid)
      .get()
      .then((docRef) => { 
          let docData = docRef.data();
          let dataObject = {
              age: docData.age,
              firstName: docData.firstName,
              lastName: docData.lastName,
              email: docData.email
          }
          user = dataObject
        }
    )
  .catch((error) => { })
  return user
  }

  export function updateFirstName(uid, firstName) {
     db
      .doc(uid)
      .update({
          firstName: firstName
      })
  }

  export function updateLastName(uid, lastName) {
    db
     .doc(uid)
     .update({
         lastName: lastName
     })
 }

 export function updateAge(uid, age) {
  db
   .doc(uid)
   .update({
       age: age,
   })
}

export function forgotPassword(email) {
  auth().sendPasswordResetEmail(email)
    .then(function (user) {
      alert('Please check your email...')
    }).catch(function (e) {
      console.log(e)
    })
}

  
export function deleteAccount() {
  var user = auth().currentUser;
  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
}
