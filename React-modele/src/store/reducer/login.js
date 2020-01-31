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
export const REFRESH = 'REFRESH';

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.inputName]: action.value,
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

export const refresh = () => ({
  type: REFRESH,


});


// --- export
export default reducer;