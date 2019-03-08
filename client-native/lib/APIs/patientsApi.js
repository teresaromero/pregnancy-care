import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true,
  validateStatus: false
});

const errHandler = err => {
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default class PatientsApi {
  static updatePatient(patient, id) {
    return instance
      .put(`/api/patients/update`, { patient, id })
      .then(res => res.data)
      .catch(errHandler);
  }

  static getPatient(id) {
    return instance
      .get(`/api/patients/record/${id}`)
      .then(res => res.data.patient)
      .catch(errHandler);
  }
}
