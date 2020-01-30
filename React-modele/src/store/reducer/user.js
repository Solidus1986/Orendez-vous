// reducer pour gérer les données relatives à l'utilisateur

// --- initial state
const initialState = {
  first_name: '',
  last_name: '',
  nb_seance: '',
  phone_number:'',
  email:'',
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
        first_name: action.first_name,
        last_name: action.last_name,
        nb_seance: action.nb_seance,
        phone_number:action.phone_number,
        email: action.email,
        logged: true,
      };

    default: return state;
  }
};

// --- action creators
export const logUser = (first_name, last_name, nb_seance, phone_number, email) => ({
  type: LOG_USER,
  first_name,
  last_name, 
  nb_seance, 
  phone_number, 
  email
});

// --- export
export default reducer;
