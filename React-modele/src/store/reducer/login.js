// --- initial state
const initialState = {
  // la valeur courante de l'input
  // la valeur du username après submit
  username: '',
  // la valeur du password après submit
  password: '',
};

// --- action types
const CHANGE_INPUT = 'CHANGE_INPUT';
export const CONNECT_USER = 'CONNECT_USER';
export const USER_DATA = 'USER_DATA';

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.inputName]: action.value,
      };
    case USER_DATA:
      return {
        ...state,
      };

    default: return state;
  }
};

// --- action creators
export const changeInput = (inputName, value) => ({
  type: CHANGE_INPUT,
  inputName,
  value,
});

export const connectUser = () => ({
  type: CONNECT_USER,

});

export const userData = () => ({
  type: USER_DATA,

});


// --- export
export default reducer;