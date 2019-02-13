export const login = user => {
  return {
    type: "LOGIN",
    user
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

export const viewPregnancy = pregnancy => {
  return {
    type: "VIEW_PATIENT",
    pregnancy
  };
};

export const exitPregnancy = () => {
  return {
    type: "EXIT_PATIENT"
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
