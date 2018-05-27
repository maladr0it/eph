import { THREAD_ADDED, THREAD_REMOVED, THREAD_MODIFIED, THREADS_REORDERED } from '../actionTypes';
import * as api from '../api';

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

export const createThread = memberIds => async () => {
  api.createThread(memberIds);
};
export const deleteThread = threadId => async () => {
  api.deleteThread(threadId);
};
// TODO: consider moving more specific thunks to their respective files
export const threadActive = (threadId, userId) => async () => {
  api.setActive(threadId, userId, true);
  api.clearUnread(threadId, userId);
};
export const threadInactive = (threadId, userId) => async () => {
  api.setActive(threadId, userId, false);
};
