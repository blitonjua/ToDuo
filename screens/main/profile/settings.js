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
              lastName: docData.lastName
          }
          user = dataObject
        }
    )
  .catch((error) => { })
  return user
  }

  export function updateUserData(uid, firstName, lastName, age) {
     db
      .doc(uid)
      .update({
          age: age,
          firstName: firstName,
          lastName: lastName
      })
    
  }
  
  const reauthenticate = (currentPassword) => {
    var currentUser = auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        currentUser.email, currentPassword);
    return currentUser.reauthenticateWithCredential(cred);
  }

  export function changePassword(currentPassword, newPassword) {
    reauthenticate(currentPassword).then(() => {
      var currentUser = auth().currentUser;
      currentUser.updatePassword(newPassword).then(() => {
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }