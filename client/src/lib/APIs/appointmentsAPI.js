import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "":"http://localhost:3000",
  withCredentials: true
});

const errHandler = err => {
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default class AppointmentsAPI {
  static allAppointments() {
    return instance
      .get("/api/appointments/all")
      .then(res => res.data)
      .catch(errHandler);
  }

  static addAppointment(appointment) {
    return instance
      .post(`/api/appointments/add`, { appointment })
      .then(res => res.data)
      .catch(errHandler);
  }

  static update(appointment) {
    return instance
      .put(`/api/appointments/update`, { appointment })
      .then(res => res.data)
      .catch(errHandler);
  }

  static delete(id) {
    return instance
      .post(`/api/appointments/delete`, { id })
      .then(res => res.data)
      .catch(errHandler);
  }
}
