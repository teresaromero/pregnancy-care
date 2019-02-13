const initialStore = {
  user: null,
  patient: null,
  pregnancy:null,
  patientList: null,
  filteredPatientList: null,
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

      break;

    case "EXIT_PATIENT":
      store = {
        ...store,
        patient: null
      };

      break;

    case "VIEW_PREGNANCY":
      store = {
        ...store,
        pregnancy: action.pregnancy
      };

      break;

    case "EXIT_PREGNANCY":
      store = {
        ...store,
        pregnancy: null
      };

      break;

    case "FETCH_PATIENTS":
      store = {
        ...store,
        patientList: action.data
      };
      break;

    case "FILTER_PATIENTS":
      store = {
        ...store,
        filteredPatientList: action.dataFiltered
      };

      break;

    default:
      return store;
  }

  return store;
};
