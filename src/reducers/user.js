import { LOGGED_IN, USER_INFO_UPDATED } from '../actionTypes';

const initialState = {
  userId: null,
  loggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN: {
      const { userId, userData } = action.payload;
      return {
        ...state,
        userId,
        ...userData,
        loggedIn: true,
      };
    }
    case USER_INFO_UPDATED: {
      const { userInfo } = action.payload;
      return {
        ...state,
        ...userInfo,
      };
    }
    default:
      return state;
  }
};
export default user;
