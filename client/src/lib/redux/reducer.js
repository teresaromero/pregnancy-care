const initialStore = {
  user: null,
  isAuth: false,
  patient: null,
  modalInfo: false,
  modalBack: false,
  modalPregn: false,
  modalVisit: false,
  patientList: null,
  filteredPatientList: null,
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

    case "OPEN_MODAL_INFO":
      store = {
        ...store,
        modalInfo: true
      };
      break;

    case "OPEN_MODAL_BACK":
      store = {
        ...store,
        modalBack: true
      };
      break;

    case "OPEN_MODAL_PREGN":
      store = {
        ...store,
        modalPregn: true
      };
      break;

    case "OPEN_MODAL_VISIT":
      store = {
        ...store,
        modalVisit: true
      };
      break;

    case "CLOSE_MODAL":
      store = {
        ...store,
        modalInfo: false,
        modalBack: false,
        modalPregn: false,
        modalVisit: false
      };
      break;

    default:
      return store;
  }

  return store;
};
