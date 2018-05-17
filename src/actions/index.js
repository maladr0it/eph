import { loggedIn } from './user';
import { threadAdded, threadRemoved, threadModified, threadsUpdated } from './threads';
import { messageAdded } from './messages';

import * as api from '../api';

// Thunks here
// TODO: consider sagas for follow-on effects of actions
// TODO: consider file structure

// TODO: this should be replaced by a orderByChild query
const orderThreads = threads =>
  Object.keys(threads).sort((a, b) => threads[a].updated > threads[b].updated);

const onMessage = (threadId, messageId, messageData) => (dispatch) => {
  console.log(`adding message ${messageId} to ${threadId}`);
  dispatch(messageAdded(threadId, messageId, messageData));
};
// UNUSED: automatically opens a message listener when a new thread is added
const onThread = (changeType, threadId, threadData) => (dispatch, getState) => {
  if (changeType === 'added') {
    console.log(`adding thread ${threadId}`);
    dispatch(threadAdded(threadId, threadData));
    // when a thread is loaded, listen for its messages
    api.listenForMessages(threadId, (id, data) => dispatch(onMessage(threadId, id, data)));
  }
  if (changeType === 'removed') {
    console.log(`removing thread ${threadId}`);
    dispatch(threadRemoved(threadId));
    // TODO: kill message listener
  }
  if (changeType === 'modified') {
    console.log(`modifying thread ${threadId}`);
    dispatch(threadModified(threadId, threadData));
  }
};
export const createThread = memberIds => async () => {
  api.createThread(memberIds);
};
export const sendMessage = (threadId, author, text) => async () => {
  api.createMessage(threadId, author, text);
};
export const login = () => async (dispatch) => {
  const userId = await api.login();
  // once logged in, listen for user's threads
  api.listenToThreads(userId, (changeType, id, data) => dispatch(onThread(changeType, id, data)));
  dispatch(loggedIn(userId));
};

// const onThreadsUpdate = (threadIds, threadsData) => (dispatch) => {
//   dispatch(threadsUpdated(threadIds, threadsData));
// };

// api.listenToThreads(userId, (threadIds, threadsData) =>
//   dispatch(onThreadsUpdate(threadIds, threadsData)));
