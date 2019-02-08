import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { Messages } from "./Messages";
import { TextArea } from "./TextArea";

class _PreconceptionalForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: {
        diseases:"",
        surgeries:"",
        allergies:"",
        riskHistory:"",
        addictions:"",
        pregnancies:0,
        labours:0,
        caesareanSections:0,
        abortions:0
      }
    };
  }

  handleSave(e) {
    e.preventDefault();
    const { record } = this.state;
    const { dispatch } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }
    PatientsApi.addRecord(record, this.props.patientId).then(res => {
      console.log(res.patient);
      dispatch(viewPatient(res.patient));
    });
  }

  handleRecordChange(e) {
    let uptRecord = { ...this.state.record };
    let { value } = e.target;
    let field = e.target.name;
    uptRecord[field] = value;
    this.setState({ record: uptRecord });
  }

  render() {
    let { record } = this.state;
    return (
      <div className="section">
        <Messages />

        <div className="section">
          <TextArea
            label="Previous Diseases"
            value={record.diseases}
            name="diseases"
            handleChange={e => this.handleRecordChange(e)}
            placeholder=""
          />

          <TextArea
            label="Previous Surgeries"
            value={record.surgeries}
            name="surgeries"
            handleChange={e => this.handleRecordChange(e)}
            placeholder=""
          />

          <TextArea
            label="Allergies"
            value={record.alergies}
            name="alergies"
            handleChange={e => this.handleRecordChange(e)}
            placeholder=""
          />

          <TextArea
            label="Risk History"
            value={record.riskHistory}
            name="riskHistory"
            handleChange={e => this.handleRecordChange(e)}
            placeholder=""
          />
          <TextArea
            label="Addictions"
            value={record.addictions}
            name="addictions"
            handleChange={e => this.handleRecordChange(e)}
            placeholder=""
          />
          <div className="field-body">
            <InputP
              id="pregnancies"
              name="pregnancies"
              label="Pregnancies"
              value={record.pregnancies}
              type="number"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="labours"
              name="labours"
              label="Natural Labour"
              value={record.labours}
              type="number"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="caesareanSections"
              name="caesareanSections"
              label="C-Section"
              value={record.caesareanSections}
              type="number"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="abortions"
              name="abortions"
              label="Abortions"
              value={record.abortions}
              type="number"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
        </div>

        <div className="has-text-centered">
          <button
            className="button is-primary"
            onClick={e => this.handleSave(e)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export const PreconceptionalForm = withRouter(connect()(_PreconceptionalForm));
