import firebase from './firebase';

const db = firebase.database();

export const createThread = async (memberIds) => {
  // TODO: replace with an update? maybe requires 2 server hits
  const memberMeta = memberIds.reduce(
    (acc, id) => {
      acc.members[id] = true;
      acc.active[id] = { active: false }; // TODO: flatten on db-side
      acc.unread[id] = 0;
      acc.authoring[id] = false;
      return acc;
    },
    {
      members: {},
      active: {},
      unread: {},
      authoring: {},
    },
  );
  db.ref('threads').push({ ...memberMeta });
};
export const listenToThreads = (userId, onThread) => {
  const threadsRef = db.ref('threads').orderByChild(`members/${userId}`);
  threadsRef.on('child_added', (snap) => {
    onThread('added', snap.key, snap.val());
  });
  threadsRef.on('child_removed', (snap) => {
    onThread('removed', snap.key, snap.val());
  });
  threadsRef.on('child_changed', (snap) => {
    onThread('modified', snap.key, snap.val());
  });
};
