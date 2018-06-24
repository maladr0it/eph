import shortid from 'shortid';

import { db, auth } from './firebase';
import { generateLink } from './links';

const createUser = async (userId) => {
  const inboxToken = shortid.generate();
  // const inboxLink = await generateLink(inboxToken);
  const inboxLink = 'http://www.example.com';
  db.doc(`users/${userId}`).set({
    inboxToken,
    inboxLink,
  });
  return { inboxToken, inboxLink };
};

const getUser = async (userId) => {
  const doc = await db.doc(`users/${userId}`).get();
  return doc.data();
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
  let userData = null;

  if (resp.additionalUserInfo.isNewUser) {
    console.log('USER DOES NOT EXIST');
    userData = await createUser(userId);
  } else {
    console.log('USER EXISTS');
    // userData = await createUser(userId);
    userData = await getUser(userId);
    console.log(userData);
  }
  return { userId, userData };
};
