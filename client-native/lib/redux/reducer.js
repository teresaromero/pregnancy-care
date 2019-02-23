const initialStore = {
  user: null,
  patient:null,
  isAuth: false,
  appointments:null,
  messages: []
};

export const rootReducer = (store = initialStore, action) => {
  switch (action.type) {
    case "LOGIN":
      store = {
        ...store,
        user: action.user,
        isAuth: true
      };
     
      break;

      case "GET_PATIENT":
      store = {
        ...store,
        patient: action.patient,
      };
   
      break;

    case "IS_AUTH":
      store = {
        ...store,
        isAuth: action.status
      };

      break;
    case "LOGOUT":
      store = {
        ...store,
        user: null,
        isAuth: false
      };
      break;

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

    default:
      return store;
  }

  return store;
};
