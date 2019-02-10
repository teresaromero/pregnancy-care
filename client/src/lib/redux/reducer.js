const initialStore = {
  user: null,
  patient:null,
  messages: []
};

export const rootReducer = (store = initialStore, action) => {
  switch (action.type) {
    case "LOGIN":
      store = {
        ...store,
        user: action.user
      };

      break;
    case "LOGOUT":
      store = {
        ...store,
        user: null
      };
      break;

    case "EDIT":
      store = {
        ...store,
        user: action.user
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

    case "VIEW_PATIENT":
      store = {
        ...store,
        patient: action.patient
      };
      console.log(store)
      break;

    case "EXIT_PATIENT":
      store = {
        ...store,
        patient: null
      };
      console.log(store)
      break;

    default:
      return store;
  }

  return store;
};
