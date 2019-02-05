const initialStore = {
  user: null,
  isAuth:false,
  messages: []
};

export const rootReducer = (store = initialStore, action) => {
  switch (action.type) {
    case "LOGIN":
    console.log(action.user)
      store = {
        ...store,
        user: action.user
      };
  
      break;
    case "LOGOUT":
      store = {
        ...store,
        user: null,
        isAuth:false
      };
      break;
    default:
      return store;

    case "ADD_MESSAGE":
      store = {
        ...store,
        messages: [action.message]
      };
      break;
    case "DELETE_ALL_MESSAGES":
      store = {
        ...store,
        messages: []
      };
      break;
  }

  return store;
};
