import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
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
  static addPatient(
    name,
    surname,
    email,
    idNum,
    street,
    number,
    zip,
    state,
    city,
    profession,
    bornDate,
    phone,
    insurance
  ) {
    return instance
      .post("/api/patients/create", {
        name,
        surname,
        email,
        idNum,
        street,
        number,
        zip,
        state,
        city,
        profession,
        bornDate,
        phone,
        insurance
      })
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }
}
