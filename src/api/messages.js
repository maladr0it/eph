import firebase from './firebase';

const db = firebase.database();

// TODO: ideally replaced with firebase.database.ServerValue.TIMESTAMP
const getServerTime = async () => {
  const snapshot = await db.ref('.info/serverTimeOffset').once('value');
  const offset = snapshot.val() || 0;
  return new Date(Date.now() + offset).toISOString();
};

export const listenForMessages = (threadId, onMessage) => {
  console.log(`listening for ${threadId}'s messages...`);
  db
    .ref(`messages/${threadId}`)
    .orderByChild('created')
    .on('child_added', (snap) => {
      const id = snap.key;
      const val = snap.val();
      const data = {
        author: val.author,
        text: val.message,
      };
      onMessage(id, data);
    });
};
// TODO: this should probably be done via cloud function
const getInactiveMembers = async (threadId) => {
  const ref = await db.ref(`threads/${threadId}/active`).once('value');
  const activeStatus = ref.val();
  console.log('activeStatus:', activeStatus);
  const inactiveMembers = Object.keys(activeStatus).filter(id => activeStatus[id].active === false);
  return inactiveMembers;
};

export const createMessage = async (threadId, author, text) => {
  console.log(`adding message ${text} to thread ${threadId}`);
  const serverTime = await getServerTime();
  // const inactiveMembers = await getInactiveMembers(threadId);
  // console.log('inactive members are:', inactiveMembers);

  // inactiveMembers.forEach((id) => {
  //   // console.log(`updating thread ${threadId}'s unread count for user ${id}`);
  //   db.ref(`threads/${threadId}/unread/${id}`).transaction(count => (count || 0) + 1);
  // });

  // update specific fields
  // const unreadUpdates = inactiveMembers.reduce((acc, id) => {
  //   acc[`threads/${threadId}/unread/${id}`] = 'TEST';
  //   return acc;
  // }, {});

  // test transactions
  // db.ref(`threads/${threadId}/testCount`).transaction(count => (count || 0) + 1);

  // changing labels to conform with server
  db.ref(`messages/${threadId}`).push({
    author,
    message: text,
    created: serverTime,
    // created: firebase.database.ServerValue.TIMESTAMP,
  });
  db.ref(`threads/${threadId}`).update({
    lastMessage: text,
    updated: serverTime,
  });
};
