import { loggedIn } from './user';
import {
  threadAdded,
  threadRemoved,
  threadModified,
  threadsReordered,
  threadsUpdated,
} from './threads';
import { messageAdded } from './messages';

import * as api from '../api';

// Thunks here
// TODO: consider sagas for follow-on effects of actions
// TODO: consider file structure

// TODO: this should be replaced by a orderByChild query
const orderThreads = threads =>
  Object.keys(threads).sort((a, b) => threads[a].updated < threads[b].updated);

const onMessage = (threadId, messageId, messageData) => (dispatch) => {
  console.log(`adding message ${messageId} to ${threadId}`);
  dispatch(messageAdded(threadId, messageId, messageData));
};
const onThread = (changeType, threadId, threadData) => (dispatch, getState) => {
  if (changeType === 'added') {
    console.log(`adding thread ${threadId}`);
    dispatch(threadAdded(threadId, threadData));
    // when a thread is loaded, listen for its messages
    // could be added to threadView lifecycle method instead
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
    // for now, calculate the new order of threadIds here
    // TODO: this is not guaranteed to get the newest state,
    // consider calculating the new order with the new message
    // as an arg
    const newOrder = orderThreads(getState().threads);
    dispatch(threadsReordered(newOrder));
  }
};
export const createThread = memberIds => async () => {
  api.createThread(memberIds);
};
// TODO: consider moving more specific thunks to their respective files
export const threadActive = (threadId, userId) => async () => {
  api.setActive(threadId, userId, true);
  api.clearUnread(threadId, userId);
};
export const threadInactive = (threadId, userId) => async () => {
  api.setActive(threadId, userId, false);
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
