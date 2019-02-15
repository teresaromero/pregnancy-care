import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";
import { TextArea } from "./TextArea";
import CheckboxContainer from "./CheckboxContainer";

const optionsRequest = [
  "Ultrasound 1Term",
  "Ultrasound 2Term",
  "Ultrasound 3Term",
  "Blood Test 1Term",
  "Blood Test 2Term",
  "Blood Test 3Term"
];

class _VisitForm extends React.Component {
  constructor() {
    super();
    this.state = {
      visit: {
        date: Date.now()
      },
      weight: {
        date: Date.now()
      },
      bloodPressure: {
        date: Date.now()
      },
      IMC: {
        date: Date.now()
      }
    };
  }

  handleUpdate(e) {
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
      this.setState({
        visit: {
          date: Date.now()
        },
        weight: {
          date: Date.now()
        },
        bloodPressure: {
          date: Date.now()
        },
        IMC: {
          date: Date.now()
        }
      });
    });
  }

  handleFieldChange(e) {
    let { patient } = this.props;
    let { name } = e.target;
    if (name === "weight") {
      let uptWeight = { ...this.state.weight };
      let { value } = e.target;
      uptWeight["value"] = value;

      let uptIMC = { ...this.state.IMC };
      let IMC = value / Math.pow(patient.recordId.height / 100, 2);
      uptIMC["value"] = IMC.toFixed(2);
      console.log(uptIMC.value)
      this.setState({ weight: uptWeight, IMC: uptIMC }, () =>
        console.log(this.state)
      );
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
      <article className="media box">
        <div className="media-content">
          <p className="subtitle">New Visit</p>
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

          <div className="field-wrapper columns">
            <div className="column">
              <InputP
                id="weight"
                name="weight"
                label="Weight"
                value={weight.value || 0}
                type="number"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column">
              <InputP
                id="IMC"
                name="IMC"
                label="IMC"
                value={IMC.value || 0}
                type="number"
                handleChange={e => this.handleFieldChange(e)}
                disabled
              />
            </div>
            <div className="column">
              <InputP
                id="bloodPressureS"
                name="bloodPressureS"
                label="Pressure - Systolic"
                value={bloodPressure.Systolic || 0}
                type="number"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
            <div className="column">
              <InputP
                id="bloodPressureD"
                name="bloodPressureD"
                label="Pressure - Diastolic"
                value={bloodPressure.Diastolic || 0}
                type="number"
                handleChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>

          <div className="field">
            <p className="label">Requested Medical Test</p>
            <div className="field-wrapper section">
              <CheckboxContainer
                options={optionsRequest}
                selection={s => this.handleSelection(s, "medicalTest")}
              />
            </div>
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
              label="Test Results"
              value={visit.testResults || ""}
              name="testResults"
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
            onClick={e => this.handleUpdate(e)}
          >
            Submit
          </button>
        </div>
      </article>
    );
  }
}

export const VisitForm = withRouter(
  connect(store => ({
    patient: store.patient
  }))(_VisitForm)
);
