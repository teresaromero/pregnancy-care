export const login = user => {
  return {
    type: "LOGIN",
    user
  };
};

export const loginAct = () => {
  return {
    type: "LOGIN_ACTIVE"
  };
};

export const signupAct = () => {
  return {
    type: "SIGNUP_ACTIVE"
  };
};

export const isAuth = status => {
  return {
    type: "IS_AUTH",
    status
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const edit = user => {
  return {
    type: "EDIT",
    user
  };
};

export const errorMessageAction = message => {
  return {
    type: "ADD_MESSAGE",
    message
  };
};

export const clearMessages = () => {
  return {
    type: "DELETE_ALL_MESSAGES"
  };
};

export const getAppointments = appointments => {
  return {
    type: "FETCH_APPOINTMENTS",
    appointments
  };
};
export const openModalAppointment = () => {
  return {
    type: "OPEN_MODAL_APPOINTMENT"
  };
};

export const selectDay = event => {
  return {
    type: "SELECT_DAY",
    event
  };
};

export const unSelectDay = () => {
  return {
    type: "UNSELECT_DAY"
  };
};

export const viewPatient = patient => {
  return {
    type: "VIEW_PATIENT",
    patient
  };
};

export const exitPatient = () => {
  return {
    type: "EXIT_PATIENT"
  };
};

export const openModalInfo = () => {
  return {
    type: "OPEN_MODAL_INFO"
  };
};

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL"
  };
};

export const openModalBack = () => {
  return {
    type: "OPEN_MODAL_BACK"
  };
};

export const openModalPregn = () => {
  return {
    type: "OPEN_MODAL_PREGN"
  };
};

export const openModalVisit = () => {
  return {
    type: "OPEN_MODAL_VISIT"
  };
};

export const fetchPatients = data => {
  return {
    type: "FETCH_PATIENTS",
    data
  };
};

export const filterPatients = dataFiltered => {
  return {
    type: "FILTER_PATIENTS",
    dataFiltered
  };
};
