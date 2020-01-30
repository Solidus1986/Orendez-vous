// --- initial state
const initialState = {
    // la valeur courante de l'input
    inputValue: '',
    // la valeur du username après submit
    username: '',
    // la valeur du password après submit
    password: '',
  };
  
  // --- action types
  const CHANGE_INPUT = 'CHANGE_INPUT';
  export const CONNECT_USER = 'CONNECT_USER';
  
  // --- Reducer
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case CHANGE_INPUT:
        return {
          ...state,
          inputValue: action.value,
        };
  
      default: return state;
    }
  };
  
  // --- action creators
  export const changeInput = (value) => ({
    type: CHANGE_INPUT,
    value,
  });
  
  export const connectUser = () => ({
    type: CONNECT_USER,
  });
  
  // --- export
  export default reducer;
  