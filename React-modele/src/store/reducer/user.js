// reducer pour gérer les données relatives à l'utilisateur

// --- initial state
const initialState = {
  user_display_name: '',
  user_email: '',
  user_nicename: '',
  username: '',
  logged: false,

  // dataUser
  id: '', 
  first_name: '', 
  last_name: '', 
  slug: '', 
  meta: '',
};


// --- action types
const LOG_USER = 'LOG_USER';
const DATA_USER = 'DATA_USER';

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
    case DATA_USER:
      return {
        ...state,
        id: action.id, 
        first_name: action.first_name, 
        last_name: action.last_name, 
        slug: action.slug, 
        meta: action.meta,
        logged:true
      }

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

export const dataUser = ( id, first_name, last_name, slug, meta) => ({
  type: DATA_USER,
  id, 
  first_name, 
  last_name, 
  slug, 
  meta,
})

// --- export
export default reducer;
