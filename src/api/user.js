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
export const getUserFromInboxToken = async (inboxToken) => {
  const resp = await db
    .ref('users')
    .orderByChild('inboxToken')
    .equalTo(inboxToken)
    .once('child_added');
  return resp.key;
};
export const login = async () => {
  const resp = await auth.signInAnonymously();
  const userId = resp.user.uid;
  let user = {};

  if (resp.additionalUserInfo.isNewUser) {
    user = await createUser(userId);
  } else {
    user = await getUser(userId);
  }
  return userId;
};
