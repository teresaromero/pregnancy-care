import React from "react";
import AuthApi from "../lib/authApi";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, login, clearMessages } from "../lib/redux/actions";

import { InputF } from "./Input";
import PatientsApi from "../lib/patientsApi";

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
      insurance: ""
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
      insurance
    } = this.state;
    const { history, dispatch } = this.props;
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
      insurance
    )
      .then(res => {
        dispatch(clearMessages());
        console.log(res);
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
      insurance
    } = this.state;

    return (
      <div className="section">
        <form method="POST" onSubmit={e => this.handleSubmit(e)}>
          {/* IDENTIFICATION SUBFORM */}
          <div className="field identification">
            <div className="field-label is-normal">
              <label className="label">Identification</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Name</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Surname</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={e => this.setState({ surname: e.target.value })}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="field-label is-normal">
                <label className="label">ID</label>
              </div>
              <p className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="ID"
                  value={idNum}
                  onChange={e => this.setState({ idNum: e.target.value })}
                />
              </p>
            </div>
            <div className="field">
              <div className="field-label is-normal">
                <label className="label">Born Date</label>
              </div>
              <p className="control is-expanded">
                <input
                  className="input"
                  type="date"
                  placeholder=""
                  value={bornDate}
                  onChange={e => this.setState({ bornDate: e.target.value })}
                />
              </p>
            </div>
          </div>
          {/* CONTACT SUBFORM */}
          <div className="field contact">
            <div className="field-label is-normal">
              <label className="label">Contact Information</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Street</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={e => this.setState({ street: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Number</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Number"
                    value={number}
                    onChange={e => this.setState({ number: e.target.value })}
                  />
                </p>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">City</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">State</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => this.setState({ state: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Zip Code</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Zip Code"
                    value={zip}
                    onChange={e => this.setState({ zip: e.target.value })}
                  />
                </p>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Phone</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => this.setState({ phone: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Email</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field additional">
            <div className="field-label is-normal">
              <label className="label">Aditional Info</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Insurance</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insurance"
                    value={insurance}
                    onChange={e => this.setState({ insurance: e.target.value })}
                  />
                </p>
              </div>
              <div className="field">
                <div className="field-label is-normal">
                  <label className="label">Profession</label>
                </div>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Profession"
                    value={profession}
                    onChange={e =>
                      this.setState({ profession: e.target.value })
                    }
                  />
                </p>
              </div>
            </div>
          </div>

          <button type="submit" className="button is-primary">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export const NewPatientForm = withRouter(connect()(_NewPatientForm));
