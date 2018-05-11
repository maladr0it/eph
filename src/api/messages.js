import firebase from './firebase';

const db = firebase.database();

export const listenForMessages = (threadId, onMessage) => {
  console.log(`listening for ${threadId}'s messages...`);
  db.ref(`messages/${threadId}`)
    .on('child_added', (snap) => {
      const id = snap.key;
      const val = snap.val();
      // shape the message data to a db-agnostic format here
      const data = {
        author: val.author,
        text: val.message,
      };
      onMessage(threadId, id, data);
    });
};
