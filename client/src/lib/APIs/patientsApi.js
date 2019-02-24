import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "":'http://localhost:3000',
  withCredentials: true,
  validateStatus: false
});

export default class PatientsApi {
  static allPatients() {
    return instance
      .get("/api/patients/all")
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  static search(query) {
    return instance
      .get(`/api/patients/search?q=${query}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static addPatient(patient) {
    return instance
      .post("/api/patients/create", { patient })
      .then(res => res.data)
      .catch(e => console.log(e));
  }

  static updatePatient(patient, id) {
    return instance
      .put(`/api/patients/update`, { patient, id })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getPatient(id) {
    return instance
      .get(`/api/patients/record/${id}`)
      .then(res => res)
      .catch(err => console.log(err));
  }

  static getPregnancy(id) {
    return instance
      .get(`/api/patients/pregnancy/${id}`)
      .then(res => res)
      .catch(err => console.log(err));
  }

  static deletePatient(id) {
    return instance
      .get(`/api/patients/record/delete/${id}`)
      .then(res => res)
      .catch(err => console.log(err));
  }

  static createRecord(id) {
    return instance
      .post(`/api/patients/record/create`, { id })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static updateRecord(record, idRecord, idPatient) {
    return instance
      .put(`/api/patients/record/update`, { record, idRecord, idPatient })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static addVisit(visit, weight, bloodPressure, IMC, idRecord, idPatient) {
    return instance
      .put(`/api/patients/record/visit`, { visit, weight, bloodPressure, IMC, idRecord, idPatient })
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
