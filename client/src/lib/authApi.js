import { get, post } from "./fetchConfig";

export default class AuthApi {
  static signup(name, surname, email, password) {
    return post("/api/auth/signup", { name, surname, email, password })
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static login(email, password) {
    return post("/api/auth/login", { email, password })
      .then(res => {
        return res.user;
      })
      .catch(err => console.log(err));
  }

  static logout() {
    return get("/api/auth/logout")
      .then(res => console.log(res.success))
      .catch(err => console.log(err));
  }

  static currentUser() {
    return get("/api/auth/currentUser")
      .then(user => {
        return user;
      })
      .catch(err => console.log(err));
  }

  static isAdmin() {
    return get("/api/auth/isAdmin")
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }
}
