import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, closeModal } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";
import { TextArea } from "./TextArea";
import CheckboxContainer from "./CheckboxContainer";
import { Loader } from "./Loader";

const optionsRequest = ["📺 Ultrasound", "💉 Blood Test"];

class _VisitForm extends React.Component {
  constructor() {
    super();
    this.state = {
      visit: {
        date: Date.now()
      },
      weight: {
        date: Date.now(),
        value: 0
      },
      bloodPressure: {
        date: Date.now(),
        Systolic: 0,
        Diastolic: 0
      },
      IMC: {
        date: Date.now(),
        value: 0
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { visit, weight, bloodPressure, IMC } = this.state;
    const { dispatch, patient } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.addVisit(
      visit,
      weight,
      bloodPressure,
      IMC,
      patient.recordId._id,
      patient._id
    ).then(res => {
      dispatch(viewPatient(res.patient));
      dispatch(closeModal());
    });
  }

  handleFieldChange(e) {
    let { patient } = this.props;
    let { name } = e.target;
    if (name === "weight") {
      let uptWeight = { ...this.state.weight };
      let uptIMC = { ...this.state.IMC };
      let { value } = e.target;
      uptWeight["value"] = value;

      let IMC =
        value /
        ((patient.recordId.height / 100) * (patient.recordId.height / 100));
      uptIMC["value"] = IMC.toFixed(2);

      this.setState({ weight: uptWeight, IMC: uptIMC });
    } else if (name === "bloodPressureD" || name === "bloodPressureS") {
      let uptRecord = { ...this.state.bloodPressure };
      let { value } = e.target;
      name === "bloodPressureD"
        ? (uptRecord["Diastolic"] = value)
        : (uptRecord["Systolic"] = value);

      this.setState({ bloodPressure: uptRecord });
    } else {
      let uptRecord = { ...this.state.visit };
      let { value } = e.target;
      let field = e.target.name;
      uptRecord[field] = value;
      this.setState({ visit: uptRecord });
    }
  }

  handleSelection(s, field) {
    let uptRecord = { ...this.state.visit };
    let selected = [];
    s.forEach((v, k) => {
      if (v) {
        selected.push(k);
      }
    });
    uptRecord[field] = selected;
    this.setState({ visit: uptRecord });
  }

  render() {
    let { visit, weight, IMC, bloodPressure } = this.state;
    let { patient } = this.props;
    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <div className="box">
              <div className="field-wrapper columns">
                <div className="column">
                  <p className="label">Patient: {patient.name}</p>
                </div>
                <div className="column">
                  <p className="label">
                    Week:{moment().diff(patient.recordId.LMP, "weeks")}
                  </p>
                </div>
              </div>

              <div className="field-wrapper">
                <div className="columns is-marginless is-paddingless">
                  <div className="column">
                    <InputP
                      id="weight"
                      name="weight"
                      label="Weight"
                      value={weight.value}
                      type="number"
                      handleChange={e => this.handleFieldChange(e)}
                      min={0}
                    />
                  </div>
                  <div className="column">
                    <InputP
                      id="IMC"
                      name="IMC"
                      label="IMC"
                      value={IMC.value}
                      type="number"
                      handleChange={e => this.handleFieldChange(e)}
                      disabled
                    />
                  </div>
                  <div className="column">
                    <InputP
                      id="bloodPressureS"
                      name="bloodPressureS"
                      label="Systolic"
                      value={bloodPressure.Systolic}
                      type="number"
                      handleChange={e => this.handleFieldChange(e)}
                      min={0}
                    />
                  </div>
                  <div className="column">
                    <InputP
                      id="bloodPressureD"
                      name="bloodPressureD"
                      label="Diastolic"
                      value={bloodPressure.Diastolic}
                      type="number"
                      handleChange={e => this.handleFieldChange(e)}
                      min={0}
                    />
                  </div>
                </div>
              </div>

              <div className="field-wrapper section">
                <p className="label">Requested Medical Test</p>

                <CheckboxContainer
                  options={optionsRequest}
                  selection={s => this.handleSelection(s, "medicalTest")}
                />
              </div>

              <div className="field-wrapper section">
                <TextArea
                  label="Test Results"
                  value={visit.testResults || ""}
                  name="testResults"
                  handleChange={e => this.handleFieldChange(e)}
                  rows="2"
                />
              </div>
              <div className="field-wrapper section">
                <TextArea
                  label="Notes"
                  value={visit.notes || ""}
                  name="notes"
                  handleChange={e => this.handleFieldChange(e)}
                  rows="2"
                />
              </div>
              <div className="field-wrapper section">
                <TextArea
                  label="Recommendations"
                  value={visit.notesOut || ""}
                  name="notesOut"
                  handleChange={e => this.handleFieldChange(e)}
                  rows="2"
                />
              </div>

              <button
                className="button is-info"
                onClick={e => this.handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const VisitForm = withRouter(
  connect(store => ({
    patient: store.patient
  }))(_VisitForm)
);
