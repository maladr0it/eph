import { loggedIn } from './user';
import { threadAdded, threadRemoved, threadModified, threadsReordered } from './threads';
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
    dispatch(threadAdded(threadId, threadData));
    // when a thread is loaded, listen for its messages
    // could be added to threadView lifecycle method instead
    api.listenForMessages(threadId, (id, data) => dispatch(onMessage(threadId, id, data)));
  }
  if (changeType === 'removed') {
    dispatch(threadRemoved(threadId));
    // TODO: kill message listener
  }
  if (changeType === 'modified') {
    dispatch(threadModified(threadId, threadData));
    // for now, calculate the new order of threadIds here
    // TODO: this is not guaranteed to get the newest state,
    // consider calculating the new order with the new message
    // as an arg
    const newOrder = orderThreads(getState().threads);
    dispatch(threadsReordered(newOrder));
  }
};
// TODO: this should perhaps be done by looking at the redux store
// but it may not have finished downloading
// need some kind of flag to state that our inbox is finished syncing
export const followLink = (userId, inboxToken) => async () => {
  const partnerId = await api.getUserFromInboxToken(inboxToken);
  // check if user already has a thread with this person
  const threads = await api.getThreads(userId);
  const [threadWithPartner] = Object.keys(threads).filter((id) => {
    const { members } = threads[id];
    return Object.keys(members).includes(partnerId);
  });
  if (threadWithPartner) {
    return threadWithPartner;
  }
  const res = await api.createThread([userId, partnerId]);
  return res.key;
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
