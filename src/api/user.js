import shortid from 'shortid';

import firebase from './firebase';

const auth = firebase.auth();
const db = firebase.database();

const createUser = async (userId) => {
  db.ref(`users/${userId}`).set({
    inboxToken: shortid.generate(),
  });
};
const getUser = async (userId) => {
  const snap = await db.ref(`users/${userId}`).once('value');
  return snap.val();
};
export const login = async () => {
  console.log('logging in');
  const resp = await auth.signInAnonymously();
  const userId = resp.user.uid;
  let user = {};

  if (resp.additionalUserInfo.isNewUser) {
    user = await createUser(userId);
  } else {
    user = await getUser(userId);
  }
  console.log('logged in as', userId);
  return userId;
};
