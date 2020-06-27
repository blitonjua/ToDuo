import React from 'react';
import firestore from '@react-native-firebase/firestore';

var db = firestore().collection('Users');

export const deleteItem = (uid, goalId, ToDoId) => {
  console.log(ToDoId);
  db.doc(uid)
    .collection('goals')
    .doc(goalId)
    .collection('ToDo')
    .doc(ToDoId)
    .delete();
};

export const addToDo = (uid, goalId, item) => {
  db.doc(uid)
    .collection('goals')
    .doc(goalId)
    .collection('ToDo')
    .doc(item)
    .set({
      itemDescription: item,
      done: false,
    });
};
export async function getToDoList(uid, goalId) {
  var items = [];
  // console.log('you are at the TO Do list');
  await db
    .doc(uid)
    .collection('goals')
    .doc(goalId)
    .collection('ToDo')
    .get()
    .then(snap => {
      snap.forEach(currentItem => {
        let currentData = currentItem.data();
        let itemObject = {
          completed: currentData.done,
          itemDescription: currentData.itemDescription,
        };
        items.push(itemObject);
      });
    });
  return items;
}
