import { MESSAGE_ADDED } from '../actionTypes';
import * as api from '../api';

export const messageAdded = (threadId, messageId, messageData) => ({
  type: MESSAGE_ADDED,
  payload: { threadId, messageId, messageData },
});
export const sendMessage = (threadId, author, text) => async () => {
  api.createMessage(threadId, author, text);
};
