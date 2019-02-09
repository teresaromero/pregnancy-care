import React from "react";
import moment, { now } from "moment";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";
import { InputDiv } from "./InputDiv";

import { insurances } from "../lib/insuranceCompany";
import { Messages } from "./Messages";

class _NewPatientForm extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: {
        name: "",
        surname: "",
        idNum: "",
        bornDate: "",
        address: {
          street: "",
          number: "",
          city: "",
          zip: "",
          state: ""
        },
        phone: "",
        email: "",
        insurance: "",
        insNumber: "",
        profession: "",
        GDPR: false
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { patient } = this.state;
    const { history } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.addPatient(patient)
      .then(res => {
        let { patient } = res;
        history.push(`/admin/patients/record/${patient._id}`);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleRecordChange(e) {
    let uptPatient = { ...this.state.patient };
    let { value } = e.target;
    let field = e.target.name;
    if (
      field === "street" ||
      field === "number" ||
      field === "city" ||
      field === "state" ||
      field === "zip"
    ) {
      uptPatient["address"][field] = value;
      this.setState({ patient: uptPatient });
    }
    if (field === "GDPR") {
      let checked = e.target.value;
   uptPatient[field] = checked
      
      console.log(uptPatient);
      this.setState({ patient: uptPatient},()=>{
        console.log(this.state)
         
      }
    
      );
    }
    uptPatient[field] = value;
    this.setState({ patient: uptPatient });
  }

  render() {
    let { patient } = this.state;

    return (
      <div className="section">
        <Messages />

        <div className="section">
          <p>Identification</p>
          <div className="field-body">
            <InputP
              id="name-patient"
              name="name"
              label="Name"
              value={patient.name}
              type="text"
              placeholder="Name"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="surname-patient"
              name="surname"
              label="Surname"
              value={patient.surname}
              type="text"
              placeholder="Surname"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
          <div className="field-body">
            <InputP
              id="id-patient"
              name="idNum"
              label="ID"
              value={patient.idNum}
              type="text"
              placeholder="ID"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="born-date-patient"
              name="bornDate"
              label="Born Date"
              value={moment(patient.bornDate).format("YYYY-MM-DD")}
              type="date"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
        </div>
        <div className="section">
          <p>Contact Information</p>
          <div className="field-body">
            <InputP
              id="street-patient"
              name="street"
              label="Street"
              value={patient.address.street}
              type="text"
              placeholder="Street"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="number-patient"
              name="number"
              label="Number"
              value={patient.address.number}
              type="text"
              placeholder="24"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
          <div className="field-body">
            <InputP
              id="city-patient"
              name="city"
              label="City"
              value={patient.address.city}
              type="text"
              placeholder="City"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="state-patient"
              name="state"
              label="State"
              value={patient.address.state}
              type="text"
              placeholder="State"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="zip-patient"
              name="zip"
              label="Zip"
              value={patient.address.zip}
              type="text"
              placeholder="Zip"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
          <div className="field-body">
            <InputP
              id="phone-patient"
              name="phone"
              label="Phone"
              value={patient.phone}
              type="text"
              placeholder="Phone"
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="email-patient"
              name="email"
              label="Email"
              value={patient.email}
              type="email"
              placeholder="Email"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
        </div>
        <div className="section">
          <p>Additional Information</p>
          <div className="field-body">
            <div className="field">
              <label className="label">Insurance Company</label>
              <p className="control">
                <div className="select is-fullwidth">
                  <select
                    name="insurance"
                    value={patient.insurance}
                    onChange={e => this.handleRecordChange(e)}
                  >
                    {insurances.map(company => (
                      <option value={company} key={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
              </p>
            </div>
            <InputP
              id="insurance-patient"
              name="insNumber"
              label="Insurance Number"
              value={patient.insNumber}
              type="text"
              placeholder="12544785"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
          <InputDiv
            id="profession-patient"
            name="profession"
            label="Profession"
            value={patient.profession}
            type="text"
            placeholder=""
            handleChange={e => this.handleRecordChange(e)}
          />
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                name="GDPR"
                type="checkbox"
                onChange={e => this.handleRecordChange(e)}
              />
              Patient agrees with <Link to="">GDPR</Link> and has signed it.
            </label>
          </div>
        </div>
        <div className="has-text-centered">
          <button
            className="button is-primary"
            onClick={e => this.handleSubmit(e)}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

export const NewPatientForm = withRouter(connect()(_NewPatientForm));
