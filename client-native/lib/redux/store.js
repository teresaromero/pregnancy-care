import { createStore } from "redux";
import { rootReducer } from "./reducer";
import AuthAPI from "../APIs/authApi";
import { login, errorMessageAction, isAuth } from "./actions";

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

