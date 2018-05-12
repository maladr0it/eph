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

const defaultThread = {
  messageIds: [],
};
const thread = (state = defaultThread, action) => {
  switch (action.type) {
    case THREAD_ADDED: {
      const { threadData } = action.payload;
      return {
        ...state,
        ...threadData,
      };
    }
    case MESSAGE_ADDED: {
      const { messageId } = action.payload;
      return {
        ...state,
        messageIds: state.messageIds.concat(messageId),
      };
    }
    default:
      return state;
  }
};

const initialState = {};
const threads = (state = initialState, action) => {
  switch (action.type) {
    case THREAD_ADDED: {
      const { threadId } = action.payload;
      return {
        ...state,
        [threadId]: thread(state[threadId], action),
      };
    }
    case MESSAGE_ADDED: {
      const { threadId } = action.payload;
      return {
        ...state,
        [threadId]: thread(state[threadId], action),
      };
    }
    default:
      return state;
  }
};
export default threads;

export const getMessageIdsByThread = (state, threadId) =>
  (state[threadId] && state[threadId].messageIds) || [];
