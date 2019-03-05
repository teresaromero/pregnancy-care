import { createStore } from "redux";
import { rootReducer } from "./reducer";
import { login, errorMessageAction, isAuth } from "./actions";
import AuthApi from "../APIs/authApi";

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
