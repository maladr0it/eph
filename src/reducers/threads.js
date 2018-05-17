import { THREADS_UPDATED, THREAD_ADDED, THREAD_MODIFIED, THREAD_REMOVED } from '../actionTypes';

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
    case THREADS_UPDATED: {
      const { threadsData } = action.payload;
      return {
        ...threadsData,
      };
    }
    default:
      return state;
  }
};
export default threads;

// const defaultThread = {
//   messageIds: [],
// };
// const thread = (state = defaultThread, action) => {
//   switch (action.type) {
//     case THREAD_ADDED: {
//       const { threadData } = action.payload;
//       return {
//         ...state,
//         ...threadData,
//       };
//     }
//     case MESSAGE_ADDED: {
//       const { messageId } = action.payload;
//       return {
//         ...state,
//         messageIds: state.messageIds.concat(messageId),
//       };
//     }
//     default:
//       return state;
//   }
// };
