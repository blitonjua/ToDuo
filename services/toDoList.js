import React from 'react';
import firestore from '@react-native-firebase/firestore';

var db = firestore().collection('Users');

export const addToDo = (uid, goalId, item) => {
  db.doc(uid)
    .collection('goals')
    .doc(goalId)
    .collection('ToDo')
    .add({
      itemDescription: item,
      done: false,
    });
};
