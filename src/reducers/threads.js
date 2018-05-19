import { THREAD_ADDED, THREAD_MODIFIED, THREAD_REMOVED } from '../actionTypes';

// sample state
// const state = {
//   '-LC7STkh2ozgLHQvgsmO': {
//     lastUpdated: '2018-05-03T14:59:55.708Z',
//     messageIds: ['-LC7W2TSDJWUB31IGKUc', '-LC7W5x9U-jr3sO0cccA'],
//   },
//   '-LC7STxbaNTSjdv5nBdZ': {
//     lastUpdated: '2018-05-03T15:41:55.708Z',
//     messageIds: ['-LC7W6Alj1cnwU7pPPYx'],
//   },
// };

const initialState = {};
const threads = (state = initialState, action) => {
  switch (action.type) {
    case THREAD_ADDED: {
      const { threadId, threadData } = action.payload;
      return {
        ...state,
        [threadId]: threadData,
      };
    }
    case THREAD_REMOVED: {
      const { threadId } = action.payload;
      const newState = { ...state };
      delete newState[threadId];
      return newState;
    }
    case THREAD_MODIFIED: {
      const { threadId, threadData } = action.payload;
      return {
        ...state,
        [threadId]: threadData,
      };
    }
    default:
      return state;
  }
};
export default threads;

export const getThread = (state, threadId) => state[threadId];

// TODO: ew. replace with lenses or lodash get()
export const getUnread = (state, threadId, userId) =>
  state[threadId] && state[threadId].unread && state[threadId].unread[userId];
