import axios from "axios";

const instance = axios.create({
  baseURL: "https://pregnancy-care.herokuapp.com",
  withCredentials: true
});

const errHandler = err => {
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default class AuthApi {
  static currentUser() {
    return instance
      .get("/api/auth/currentUser")
      .then(res => res.data)
      .catch( errHandler);
  }
  static signup(name, surname, email, password) {
    return instance
      .post("/api/auth/signup", { name, surname, email, password })
      .then(res => res.data.user)
      .catch(errHandler);
  }

  static edit(
    name,
    surname,
    email,
    idNum,
    street,
    number,
    city,
    state,
    zip,
    bornDate,
    phone,
    id
  ) {
    return instance
      .put("/api/auth/edit", {
        name,
        surname,
        email,
        idNum,
        street,
        number,
        city,
        state,
        zip,
        bornDate,
        phone,
        id
      })
      .then(res => res.data.user)
      .catch(errHandler);
  }

  static login(email, password) {
    return instance
      .post(
        "/api/auth/login",
        { email, password }
      )
      .then(res => res.data.user)
      .catch(errHandler);
  }

  static logout() {
    return instance
      .get("/api/auth/logout")
      .then(res => res)
      .catch(errHandler);
  }
}
