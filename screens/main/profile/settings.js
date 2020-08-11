//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';

//constants

var db = firestore().collection('Users');
var user;

export async function getUserData(uid) {
  console.log('uid issssssssssssssss ' + uid);
  await db
    .doc(uid)
    .get()
    .then((docRef) => {
      let docData = docRef.data();
      let dataObject = {
        age: docData.age,
        firstName: docData.firstName,
        lastName: docData.lastName,
        email: docData.email,
        profileIndex: docData.profileIndex,
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

export function deleteAccount(uid) {
  var user = auth().currentUser;
  db.doc(uid).delete().then(function () {
    console.log("deleted")
  }).catch(function (error) {
    console.log(error);
  }).then(user.delete().then(function () {
    console.log("user deleted")
  }))
}

export function updateProfileIndex(uid, index) {
  db
  .doc(uid)
  .update({
    profileIndex: index
  })
}


