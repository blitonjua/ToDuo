import firestore from '@react-native-firebase/firestore';

const db = firestore();
// db.settings({host: 'localhost:8080'});

let readFromDatabase = (collectionName, docName) => {
  //   let data = firestore()
  //     .collection(collectionName.toString())
  //     .doc(docName.toString()).get;
  return 'data';
};

export default readFromDatabase;
