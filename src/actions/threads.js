import {
  THREAD_ADDED,
  THREAD_REMOVED,
  THREAD_MODIFIED,
  THREADS_REORDERED,
  THREADS_UPDATED,
} from '../actionTypes';

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
export const threadsReordered = newOrder => ({
  type: THREADS_REORDERED,
  payload: { newOrder },
});
export const threadsUpdated = (threadIds, threadsData) => ({
  type: THREADS_UPDATED,
  payload: { threadIds, threadsData },
});
