import firebase from './firebase';
import { getEmoji } from '../utils/emoji';

const db = firebase.database();

// TODO: put this in some shared file (api/index.js ?)
const getServerTime = async () => {
  const snapshot = await db.ref('.info/serverTimeOffset').once('value');
  const offset = snapshot.val() || 0;
  return new Date(Date.now() + offset).toISOString();
};

export const setActive = async (threadId, userId, active) => {
  if (!userId) {
    return;
  }
  // TODO: flatten DB here
  db.ref(`threads/${threadId}/active/${userId}/active`).set(active);
};
export const clearUnread = async (threadId, userId) => {
  if (!userId) {
    return;
  }
  db.ref(`threads/${threadId}/unread/${userId}`).transaction(() => 0);
};
export const deleteThread = async threadId => db.ref(`threads/${threadId}`).remove();

export const createThread = async (memberIds) => {
  // TODO: replace with an update? maybe requires 2 server hits
  const memberMeta = memberIds.reduce(
    (acc, id) => {
      acc.members[id] = true;
      acc.active[id] = { active: false }; // TODO: flatten on db-side
      acc.unread[id] = 0;
      acc.authoring[id] = false;
      acc.emoji[id] = getEmoji();
      return acc;
    },
    {
      members: {},
      active: {},
      unread: {},
      authoring: {},
      emoji: {},
    },
  );
  return db.ref('threads').push({
    ...memberMeta,
    updated: await getServerTime(),
  });
};
// TODO: DANGER! this query is sorted locally.
// CANNOT LAUNCH LIKE THIS
export const listenToThreads = (userId, onThread) => {
  const threadsRef = db
    .ref('threads')
    .orderByChild(`members/${userId}`)
    .equalTo(true);

  threadsRef.on('child_added', (snap) => {
    console.log('new thread found:', snap.val());
    onThread('added', snap.key, snap.val());
  });
  threadsRef.on('child_removed', (snap) => {
    onThread('removed', snap.key, snap.val());
  });
  threadsRef.on('child_changed', (snap) => {
    onThread('modified', snap.key, snap.val());
  });
};

export const getThreads = async (userId) => {
  const resp = await db
    .ref('threads')
    .orderByChild(`members/${userId}`)
    .equalTo(true)
    .once('value');
  return resp.val() || {};
};
