import firestore from '@react-native-firebase/firestore';

const db = firestore();

const readFromDatabase = (collectionName, docName) => {
  let data = db.collection(collectionName.toString()).doc(docName.toString())
    .get;
  return data;
};

var listOutDatabase = () => {
  db.collection('Users')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
};
var getData = uid => {
  let f = '',
    l = '',
    age = '',
    goals = [];
  console.log('hi');
  let data = db
    .collection('Users')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      console.log('data:' + documentSnapshot.data());
    });
  return [];
};
const addUser = (uid, firstName, lastName, newAge, email) => {
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

export default addUser;
