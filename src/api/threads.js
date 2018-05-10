import firebase from './firebase';

const db = firebase.database();

export const createThread = async (memberIds) => {
  const members = memberIds.reduce((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});
  const ref = await db.ref('threads').push({
    members,
  });
  console.log(ref.key);
  return ref.key;
};

// TODO: should use a token instead of userId
// for security reasons
export const listenForThreads = (userId, onThread) => {
  console.log(`listening for ${userId}'s threads...`);
  db.ref('threads')
  .orderByChild(`members/${userId}`)
  .equalTo(true)
  .on('child_added', snap => {
    const key = snap.key;
    const data = snap.val();
    onThread(key);
  });
};

export const listenForMessages = (threadId) => {
  console.log(`listening for ${threadId}'s messages...`);
};

// export const getThreads = async (userId) => {
//   const snap = await db.ref('threads')
//   .orderByChild(`members/${userId}`)
//   .equalTo(true)
//   .once('value');

//   console.log(snap.val());
// };