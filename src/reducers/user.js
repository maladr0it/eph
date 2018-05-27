import { LOGGED_IN } from '../actionTypes';

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
    default:
      return state;
  }
};
export default user;
