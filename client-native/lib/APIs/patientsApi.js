import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
  validateStatus: false
});

export default class PatientsApi {
  static updatePatient(patient, id) {
    return instance
      .put(`/api/patients/update`, { patient, id })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getPatient(id) {
    return instance
      .get(`/api/patients/record/${id}`)
      .then(res => res.data.patient)
      .catch(err => console.log(err));
  }
}
