import { createStore } from "redux";
import { rootReducer } from "./reducer";
import AuthAPI from "../APIs/authApi";
import { login, isAuth } from "./actions";

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

AuthAPI.currentUser()
  .then(user => {
    store.dispatch(login(user));
  })
  .catch(e => store.dispatch(isAuth(false)));
