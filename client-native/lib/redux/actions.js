export const login = user => {
  return {
    type: "LOGIN",
    user
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
