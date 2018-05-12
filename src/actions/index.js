import { loggedIn } from './user';
import { threadAdded } from './threads';
import { messageAdded } from './messages';

import * as api from '../api';

// Thunks here
// TODO: consider sagas for follow-on effects of actions

const onMessage = (threadId, messageId, messageData) => (dispatch) => {
  console.log(`adding message ${messageId} to ${threadId}`);
  dispatch(messageAdded(threadId, messageId, messageData));
};
const onThread = (threadId, threadData) => (dispatch) => {
  console.log(`adding thread ${threadId}`);
  dispatch(threadAdded(threadId, threadData));
  // when a thread is loaded, listen for its messages
  api.listenForMessages(threadId, (id, data) => dispatch(onMessage(threadId, id, data)));
};
export const createThread = memberIds => async () => {
  api.createThread(memberIds);
};
export const login = () => async (dispatch) => {
  const userId = await api.login();
  // once logged in, listen for user's threads
  api.listenForThreads(userId, (id, data) => dispatch(onThread(id, data)));
  dispatch(loggedIn(userId));
};
