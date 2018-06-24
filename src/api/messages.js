import { db } from './firebase';

// TODO: ideally replaced with firebase.database.ServerValue.TIMESTAMP
const getServerTime = async () => {
  const snapshot = await db.ref('.info/serverTimeOffset').once('value');
  const offset = snapshot.val() || 0;
  return new Date(Date.now() + offset).toISOString();
};

export const listenForMessages = (threadId, onMessage) => {
  db.ref(`messages/${threadId}`)
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
// TODO: db should be flattened here
const getInactiveMembers = async (threadId) => {
  const ref = await db.ref(`threads/${threadId}/active`).once('value');
  const activeStatus = ref.val();
  const inactiveMembers = Object.keys(activeStatus).filter(id => activeStatus[id].active === false);
  return inactiveMembers;
};

export const createMessage = async (threadId, author, text) => {
  const serverTime = await getServerTime();
  const updates = {};
  // create message
  const messageId = await db.ref(`messages/${threadId}`).push().key;
  updates[`messages/${threadId}/${messageId}`] = {
    author,
    message: text,
    created: serverTime,
  };
  updates[`threads/${threadId}/lastMessage`] = text;
  updates[`threads/${threadId}/updated`] = serverTime;
  db.ref().update(updates);
  // increase unread counts
  const inactiveMembers = await getInactiveMembers(threadId);
  inactiveMembers.forEach((id) => {
    db.ref(`threads/${threadId}/unread/${id}`).transaction(count => (count || 0) + 1);
  });
};
