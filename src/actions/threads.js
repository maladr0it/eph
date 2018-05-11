import { THREAD_ADDED } from '../actionTypes';

export const threadAdded = (threadId, threadData) => ({
  type: THREAD_ADDED,
  payload: { threadId, threadData },
});
