// reducer pour gérer les données relatives à l'utilisateur

// --- initial state
const initialState = {
  user_display_name: '',
  user_email: '',
  user_nicename: '',
  logged: false,
};


// --- action types
const LOG_USER = 'LOG_USER';

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOG_USER:
      return {
        ...state,
        user_display_name: action.user_display_name,
        user_email: action.user_email,
        user_nicename: action.user_nicename,
        logged: true,
      };

    default: return state;
  }
};

// --- action creators
export const logUser = (user_display_name, user_nicename, user_email) => ({
  type: LOG_USER,
  user_display_name,
  user_nicename,
  user_email,
});

// --- export
export default reducer;
