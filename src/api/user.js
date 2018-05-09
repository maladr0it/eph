import firebase from './firebase';

const auth = firebase.auth();
const db = firebase.database();

export const login = async () => {
  console.log('logging in');
  const resp = await auth.signInAnonymously()
  return resp.user;
};

export const createThread = async (members) => {
  const resp = await db.ref('threads').push({
    val1: 1,
    val2: 2,
  });
  console.log(resp);
};