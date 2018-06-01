import shortid from 'shortid';

import firebase from './firebase';
import { generateLink } from './links';

const auth = firebase.auth();
const db = firebase.database();

const createUser = async (userId) => {
  const inboxToken = shortid.generate();
  const inboxLink = await generateLink(inboxToken);

  db.ref(`users/${userId}`).set({
    inboxToken,
    inboxLink,
  });
  return { inboxToken, inboxLink };
};
const getUser = async (userId) => {
  const snap = await db.ref(`users/${userId}`).once('value');
  return snap.val();
};

export const regenerateInboxLink = async (userId) => {
  const inboxToken = shortid.generate();
  const inboxLink = await generateLink(inboxToken);
  console.log(inboxToken, inboxLink, '>>>>');
  await db.ref(`users/${userId}`).update({
    inboxToken,
    inboxLink,
  });
  return { inboxToken, inboxLink };
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
  let userData = {};

  if (resp.additionalUserInfo.isNewUser) {
    userData = await createUser(userId);
  } else {
    userData = await getUser(userId);
  }
  return { userId, userData };
};
