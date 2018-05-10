import firebase from './firebase';

const db = firebase.database();

export const listenForMessages = (threadId, onMessage) => {
  console.log(`listening for ${threadId}'s messages...`);
  db.ref(`messages/${threadId}`)
    .on('child_added', snap => {
      const id = snap.key;
      const data = snap.val();
      onMessage(threadId, id, data);
    });
};
