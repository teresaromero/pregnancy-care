import axios from "axios";

const instance = axios.create({
  baseURL: "https://cima.aemps.es/cima/rest/",

});

export default class VademecumApi {
  static drugs(param,query) {
    return instance
      .get(`medicamentos?${param}=${query}`)
      .then(res => res.data.resultados)
      .catch(err => console.log(err));
  }
  
  
}
