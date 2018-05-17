import firebase from './firebase';

const db = firebase.database();

export const createThread = async (memberIds) => {
  const members = memberIds.reduce((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});
  const active = memberIds.reduce((acc, id) => {
    // TODO DB: should be flat
    acc[id] = { active: true };
    return acc;
  }, {});
  db.ref('threads').push({
    members,
    active,
  });
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
// listen for new threads
// threadsRef.on('child_added', (snap) => {
//   console.log('thread added:', snap.val());
//   const id = snap.key;
//   const data = snap.val();
//   onThread(id, data);
// });

// export const listenToThreads2 = (userId, onThread) => {
//   // console.log(`listening for ${userId}'s threads...`);
//   const threadsRef = db.ref('threads').orderByChild(`members/${userId}`);

//   threadsRef.on('value', (snap) => {
//     console.log('threads list updated:', snap.val());
//     // create a list of ids sorted by 'updated'
//     const data = snap.val();
//     const ids = Object.keys(data).sort((a, b) => data[a].updated > data[b].updated);
//     onThread(ids, data);
//   });
// };
