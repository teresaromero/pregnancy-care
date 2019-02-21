import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
  validateStatus: false
});

export default class AppointmentsAPI {
  static allAppointments() {
    return instance
      .get("/api/appointments/all")
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static addAppointment(appointment) {
    return instance
      .post(`/api/appointments/add`, { appointment })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static update(appointment) {
    return instance
      .put(`/api/appointments/update`, { appointment })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static delete(id) {
    return instance
      .post(`/api/appointments/delete`, { id })
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
