import { MESSAGE_ADDED } from '../actionTypes';

// sample state
// const state = {
//   '-LC7W2TSDJWUB31IGKUc': {
//     author: 'ZNO5s71UJndyFxNu7alLPrVxfro1',
//     text: 'yo',
//   },
//   '-LC7W5x9U-jr3sO0cccA': {
//     author: 'VhuzOP1UNdT7HN805d6db8eDs1e2',
//     text: 'hiya',
//   },
//   '-LC7W6Alj1cnwU7pPPYx': {
//     author: 'ZNO5s71UJndyFxNu7alLPrVxfro1',
//     text: 'XD',
//   },
// },

const initialState = {};
const messages = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ADDED: {
      const { messageId, messageData } = action.payload;
      return {
        ...state,
        [messageId]: messageData,
      };
    }
    default:
      return state;
  }
};
export default messages;
