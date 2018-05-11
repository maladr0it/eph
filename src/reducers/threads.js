import { THREAD_ADDED, MESSAGE_ADDED } from '../actionTypes';

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

// overkill for now
// const messageIds = (state = [], action) => {
//   switch (action.type) {
//     case MESSAGE_ADDED: {
//       const { messageId } = action.payload;
//       return state.concat(messageId);
//     }
//     default:
//       return state;
//   }
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
    case MESSAGE_ADDED: {
      const { threadId, messageId } = action.payload;
      return state;
      // return {
      //   ...state,
      //   [threadId]: {
      //     ...state[threadId],
      //     // TODO: insert this safely using lenses or lodash set()
      //     messageIds: state[threadId].messageIds.concat(messageId),
      //   },
      // };
    }
    default:
      return state;
  }
};
export default threads;
