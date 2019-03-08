import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
  withCredentials: true
});

const errHandler = err => {
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default class UserApi {
  static uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append("profile-picture", file);
    return instance
      .post("/api/user/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  }


  static editProfile(user) {
    return instance
      .put("/editProfile", { user })
      .then(user => user)
      .catch(errHandler);
  }
}
