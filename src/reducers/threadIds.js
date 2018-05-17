import { THREAD_ADDED, THREAD_REMOVED, THREADS_REORDERED, THREADS_UPDATED } from '../actionTypes';

// sample state
// const state = [
//   '-LC7STkh2ozgLHQvgsmO',
//   '-LC7STxbaNTSjdv5nBdZ',
//   '-LC7STzWIokqsB-iYXGz',
// ];

const initialState = [];
const threadIds = (state = initialState, action) => {
  switch (action.type) {
    case THREAD_ADDED: {
      const { threadId } = action.payload;
      // add thread to the top of the threadList as it is the newest
      return [threadId].concat(state);
    }
    case THREAD_REMOVED: {
      const { threadId } = action.payload;
      const newIds = state.slice(); // make a copy
      const index = newIds.indexOf(threadId);
      if (index !== -1) {
        newIds.splice(index, 1);
      }
      return newIds;
    }
    case THREADS_REORDERED: {
      const { newOrder } = action.payload;
      return newOrder;
    }
    case THREADS_UPDATED: {
      return action.payload.threadIds;
    }
    default:
      return state;
  }
};
export default threadIds;
