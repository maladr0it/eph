import { THREAD_ADDED, THREAD_REMOVED, THREAD_MODIFIED, THREADS_UPDATED } from '../actionTypes';

export const threadAdded = (threadId, threadData) => ({
  type: THREAD_ADDED,
  payload: { threadId, threadData },
});
export const threadRemoved = threadId => ({
  type: THREAD_REMOVED,
  payload: { threadId },
});
export const threadModified = (threadId, threadData) => ({
  type: THREAD_MODIFIED,
  payload: { threadId, threadData },
});
export const threadsUpdated = (threadIds, threadsData) => ({
  type: THREADS_UPDATED,
  payload: { threadIds, threadsData },
});
