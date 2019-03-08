import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";
import { InputDiv } from "./InputDiv";
import moment from "moment";
import { insurances } from "../lib/insuranceCompany";
import { viewPatient, closeModal } from "../lib/redux/actions";
import {withApollo} from 'react-apollo'

class InformationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: {
        address: {},
        GDPR: false
      }
    };
  }

  componentWillMount() {
    let { patientEdit } = this.props;
    if (patientEdit) {
      this.setState({ patient: patientEdit });
    }
  }

  handleCreate(e) {
    e.preventDefault();
    const { patient } = this.state;
    const { history, dispatch } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.addPatient(patient)
      .then(res => {
        let { patient } = res;
        PatientsApi.createRecord(patient._id).then(res => {
          dispatch(viewPatient(res.patient));
          history.push(`/admin/patients/record/${patient._id}`);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { patient } = this.state;
    const { dispatch } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.updatePatient(patient, patient._id)
      .then(res => {
        dispatch(viewPatient(res.patient));
        dispatch(closeModal())
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleFieldChange(e) {
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

    uptPatient[field] = value;
    this.setState({ patient: uptPatient });
  }

  handleSelection(s) {
    let uptPatient = { ...this.state.patient };
    if (s.target.checked) {
      uptPatient.GDPR = true;
    } else {
      uptPatient.GDPR = false;
    }
    this.setState({ patient: uptPatient });
  }

  render() {
    let { patient } = this.state;
    let { patientEdit } = this.props;

    return (
      <div className="box">
        <p className="label label-heading">Identification</p>
        <div className="field-wrapper section">
          <div className="columns">
            <div className="column is-one-third">
              <InputP
                id="name-patient"
                name="name"
                label="Name"
                value={patient.name || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
                required
              />
            </div>
            <div className="column is-one-third">
              <InputP
                id="surname-patient"
                name="surname"
                label="Surname"
                value={patient.surname || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>

            <div className="column is-one-third">
              <InputP
                id="id-patient"
                name="idNum"
                label="ID"
                value={patient.idNum || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <InputP
                id="born-date-patient"
                name="bornDate"
                label="Born Date"
                value={moment(patient.bornDate).format("YYYY-MM-DD") || ""}
                type="date"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
        </div>

        <p className="label label-heading">Contact Information</p>
        <div className="field-wrapper section">
          <div className="columns">
            <div className="column">
              <InputP
                id="street-patient"
                name="street"
                label="Street"
                value={patient.address.street || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column is-one-fifth">
              <InputP
                id="number-patient"
                name="number"
                label="Number"
                value={patient.address.number || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <InputP
                id="city-patient"
                name="city"
                label="City"
                value={patient.address.city || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column">
              <InputP
                id="state-patient"
                name="state"
                label="State"
                value={patient.address.state || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column">
              <InputP
                id="zip-patient"
                name="zip"
                label="Zip"
                value={patient.address.zip || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-fifths">
              <InputP
                id="phone-patient"
                name="phone"
                label="Phone"
                value={patient.phone || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column">
              <InputP
                id="email-patient"
                name="email"
                label="Email"
                value={patient.email || ""}
                type="email"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
        </div>

        <p className="label label-heading">Additional Information</p>
        <div className="field-wrapper section">
          <div className="columns">
            <div className="column">
              <label className="label">Insurance Company</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="insurance"
                    value={patient.insurance || ""}
                    onChange={e => this.handleFieldChange(e)}
                  >
                    {insurances.map(company => (
                      <option value={company} key={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <InputP
                id="insurance-patient"
                name="insNumber"
                label="Insurance Number"
                value={patient.insNumber || ""}
                type="text"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <InputDiv
                id="profession-patient"
                name="profession"
                label="Profession"
                value={patient.profession || ""}
                type="text"
                placeholder=""
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="section has-text-centered">
          <div className="control">
            <label className="checkbox">
              <input
                name="GDPR"
                type="checkbox"
                onChange={e => this.handleSelection(e)}
                checked={patient.GDPR}
              />
              Patient agrees with <Link to="">GDPR</Link> and has signed it.
            </label>
          </div>
        </div>

        <div className="has-text-centered">
          {patientEdit ? (
            <button
              className="button is-primary"
              onClick={e => this.handleUpdate(e)}
            >
              Update
            </button>
          ) : (
            <button
              className="button is-primary"
              onClick={e => this.handleCreate(e)}
            >
              Create
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withApollo(withRouter(
  connect(store => ({ patientEdit: store.patient }))(InformationForm)
));
