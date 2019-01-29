const get = endPoint => {
  const url = `${process.env.APIurl}${endPoint}`;
  return fetch(url, { withCredentials: "include" })
    .then(res => res.json())
    .then(response => {
      return response;
    });
};

const post = (endPoint, data) => {
  const url = `${process.env.APIurl}${endPoint}`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: "include"
  })
    .then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export class AuthApi {
  static signup(name, surname, email, password, gender) {
    return post("api/auth/signup", { name, surname, email, password, gender })
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static login(email, password) {
    return post("api/auth/login", { email, password })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static logout() {
    return get("/api/auth/logout")
      .then(res => console.log(res.success))
      .catch(err => console.log(err));
  }

  static currentUser() {
    return get("/api/auth/currentUser")
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }

  static isAdmin() {
    return get("/api/auth/isAdmin")
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }
}
