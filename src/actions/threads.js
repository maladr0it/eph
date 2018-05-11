import { THREAD_ADDED } from '../actionTypes';

export const threadAdded = threadId => ({
  type: THREAD_ADDED,
  payload: { threadId },
});
