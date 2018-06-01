import { LOGGED_IN, USER_INFO_UPDATED } from '../actionTypes';
import * as api from '../api';

const userInfoUpdated = userInfo => ({
  type: USER_INFO_UPDATED,
  payload: { userInfo },
});
export const loggedIn = (userId, userData) => ({
  type: LOGGED_IN,
  payload: { userId, userData },
});

export const newLink = userId => async (dispatch) => {
  if (window.confirm('Are you sure you want a new 24 link? Your old link will no longer work.')) {
    const { inboxToken, inboxLink } = await api.regenerateInboxLink(userId);
    dispatch(userInfoUpdated({ inboxToken, inboxLink }));
  }
};
