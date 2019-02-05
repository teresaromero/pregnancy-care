import React from "react";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, clearMessages } from "../lib/redux/actions";

import PatientsApi from "../lib/patientsApi";
import { InputP } from "./InputP";
import { InputDiv } from "./InputDiv";

import { insurances } from "../lib/insuranceCompany";
import { Messages } from "./Message";

class _NewPatientForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      idNum: "",

      street: "",
      number: "",
      city: "",
      state: "",
      zip: "",

      profession: "",
      bornDate: "",
      phone: "",
      insurance: "",
      insNumber: "",
      GDPR: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      surname,
      email,
      idNum,
      street,
      number,
      city,
      state,
      zip,
      profession,
      bornDate,
      phone,
      insurance,
      insNumber,
      GDPR
    } = this.state;
    const { dispatch,history } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.addPatient(
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
      insurance,
      insNumber,
      GDPR
    )
      .then(res => {
        dispatch(errorMessageAction("New Patient Created"));
        history.push('/dashboard/patients')
      })
      .catch(e => {
        dispatch(errorMessageAction("Invalid credentials"));
      });
  }

  render() {
    let {
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
      insurance,
      insNumber,
      GDPR
    } = this.state;

    return (
      <div className="section">
      <Messages/>
        <form method="POST" onSubmit={e => this.handleSubmit(e)}>
          <div className="section">
            <p>Identification</p>
            <div className="field-body">
              <InputP
                id="name-patient"
                name="name"
                label="Name"
                value={name}
                type="text"
                placeholder="Name"
                handleChange={e => this.setState({ name: e.target.value })}
              />
              <InputP
                id="surname-patient"
                name="surname"
                label="Surname"
                value={surname}
                type="text"
                placeholder="Surname"
                handleChange={e => this.setState({ surname: e.target.value })}
              />
            </div>
            <div className="field-body">
              <InputP
                id="id-patient"
                name="id"
                label="ID"
                value={idNum}
                type="text"
                placeholder="ID"
                handleChange={e => this.setState({ idNum: e.target.value })}
              />
              <InputP
                id="born-date-patient"
                name="born-date"
                label="Born Date"
                value={bornDate}
                type="date"
                placeholder=""
                handleChange={e => this.setState({ bornDate: e.target.value })}
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
                value={street}
                type="text"
                placeholder="Street"
                handleChange={e => this.setState({ street: e.target.value })}
              />
              <InputP
                id="number-patient"
                name="number"
                label="Number"
                value={number}
                type="text"
                placeholder="24"
                handleChange={e => this.setState({ number: e.target.value })}
              />
            </div>
            <div className="field-body">
              <InputP
                id="city-patient"
                name="city"
                label="City"
                value={city}
                type="text"
                placeholder="City"
                handleChange={e => this.setState({ city: e.target.value })}
              />
              <InputP
                id="state-patient"
                name="state"
                label="State"
                value={state}
                type="text"
                placeholder="State"
                handleChange={e => this.setState({ state: e.target.value })}
              />
              <InputP
                id="zip-patient"
                name="zip"
                label="Zip"
                value={zip}
                type="text"
                placeholder="Zip"
                handleChange={e => this.setState({ zip: e.target.value })}
              />
            </div>
            <div className="field-body">
              <InputP
                id="phone-patient"
                name="phone"
                label="Phone"
                value={phone}
                type="text"
                placeholder="Phone"
                handleChange={e => this.setState({ phone: e.target.value })}
              />
              <InputP
                id="email-patient"
                name="email"
                label="Email"
                value={email}
                type="email"
                placeholder="Email"
                handleChange={e => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="section">
            <p>Additional Information</p>
            <div className="field-body">
              <div class="field">
                <label class="label">Insurance Company</label>
                <p class="control">
                  <div class="select is-fullwidth">
                    <select
                      value={insurance}
                      onChange={e =>
                        this.setState({ insurance: e.target.value })
                      }
                    >
                      {insurances.map(company => (
                        <option value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                </p>
              </div>
              <InputP
                id="insurance-patient"
                name="insurance"
                label="Insurance Number"
                value={insNumber}
                type="text"
                placeholder="12544785"
                handleChange={e => this.setState({ insNumber: e.target.value })}
              />
            </div>
            <InputDiv
              id="profession-patient"
              name="profession"
              label="Profession"
              value={profession}
              type="text"
              placeholder=""
              handleChange={e => this.setState({ profession: e.target.value })}
            />
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input
                  type="checkbox"
                  value={GDPR}
                  onChange={e => this.setState({ GDPR: e.target.checked })}
                />
                Patient agrees with <Link to="">GDPR</Link> and has signed it.
              </label>
            </div>
          </div>
          <div className="has-text-centered">
            <button type="submit" className="button is-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export const NewPatientForm = withRouter(connect()(_NewPatientForm));
