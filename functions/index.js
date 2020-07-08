const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore
  .document('ChatRooms/{chatRoomID}/messages/{messageID}')
  .onCreate(() => {
    let payload = {
      notification: {
        title: 'chat',
        body: 'you got a notif for a chat message',
      },
    };
    return admin
      .messaging()
      .sendToDevice(
        'fxJ86uL3Qb6dnyNiABq2_s:APA91bEKyhgltu7rVfBSwsAKFDK1zH8mPavShl3MzROMRr9G6_OP10HGuhUGDPz2rWulJd-6HLqcxIugqdnij6QmnUETVVwG1ubksb2NbIcD1UwTONKh8dAjT7Rwclc3JszQ8rWijVr-',
        payload,
      );
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
