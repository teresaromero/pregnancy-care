import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
});

export default class AppointmentsAPI {
  static allAppointments(userId) {
    return instance
      .get(`/api/appointments/all/${userId}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
