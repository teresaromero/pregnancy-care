import axios from "axios";

const instance = axios.create({
  baseURL: "https://pregnancy-care.herokuapp.com",
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
