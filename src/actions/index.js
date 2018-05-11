import { loggedIn } from './user';
import { threadAdded } from './threads';
import * as api from '../api';

// Thunks here
// const onMessage = () => (dispatch) => {};

const onThread = (threadId, threadData) => (dispatch) => {
  console.log(`adding thread ${threadId}`);
  dispatch(threadAdded(threadId));
};

export const login = () => async (dispatch) => {
  const userId = await api.login();

  // once logged in, listen for user's threads
  api.listenForThreads(userId, onThread);

  dispatch(loggedIn(userId));
};
