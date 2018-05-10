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

// TODO: this is unsafe.
export const getThreads = async (userId) => {
  const snap = await db.ref('threads')
  .orderByChild(`members/${userId}`)
  .equalTo(true)
  .once('value');

  console.log(snap.val());
};