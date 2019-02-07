import React from "react";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  errorMessageAction,
  clearMessages,
  viewPatient
} from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { Messages } from "./Messages";
import { TextArea } from "./TextArea";

class _NewRecordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: {}
    };
  }

  handleSave(e) {
    e.preventDefault();
    const { record } = this.state;
    const { dispatch, history } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }
    PatientsApi.addRecord(record, this.props.patientId).then(res => {
      console.log(res.patient)
      dispatch(viewPatient(res.patient));
    });
  }

  handleRecordChange(e) {
    let uptRecord = { ...this.state.record };
    let { value } = e.target;
    let field = e.target.name;
    if (field === "lastMenstruationDate") {
      uptRecord[field] = value;
      uptRecord["birthDate"] = moment(value)
        .clone()
        .add(40, "week")
        .format("YYYY-MM-DD");
      this.setState({ record: uptRecord }, () => {});
    }
    uptRecord[field] = value;
    this.setState({ record: uptRecord }, () => {});
  }

  render() {
    let { record } = this.state;
    return (
      <div className="section">
        <Messages />
        <form method="POST" onSubmit={e => this.handleSave(e)}>
          <div className="section">
            <p>Births Information</p>
            <div className="field-body">
              <InputP
                id="lastMenstruationDate"
                name="lastMenstruationDate"
                label="Last Menstruation Date"
                value={moment(record.lastMenstruationDate).format("YYYY-MM-DD")}
                type="date"
                placeholder=""
                handleChange={e => this.handleRecordChange(e)}
              />
              <InputP
                id="birthDate"
                name="birthDate"
                label="Birth Day"
                value={record.birthDate}
                type="date"
                placeholder=""
                disabled
              />
            </div>
            <div className="field-body">
              <InputP
                id="prevPregnancies"
                name="prevPregnancies"
                label="Previous Pregnancies Nº"
                value={record.prevPregnancies}
                type="number"
                placeholder="0"
                handleChange={e => this.handleRecordChange(e)}
              />
              <InputP
                id="prevMiss"
                name="prevMiss"
                label="Previous Miscarriage Nº"
                value={record.prevMiss}
                type="number"
                placeholder=""
                handleChange={e => this.handleRecordChange(e)}
              />
              <InputP
                id="actualPregnancy"
                name="actualPregnancy"
                label="Actual Pregnancy Nº"
                value={record.actualPregnancy}
                type="number"
                placeholder=""
                handleChange={e => this.handleRecordChange(e)}
              />
            </div>
            <div className="field-body">
              <InputP
                id="prevBirths"
                name="prevBirths"
                label="Total Births Nº"
                value={record.prevBirths}
                type="number"
                placeholder="0"
                handleChange={e => this.handleRecordChange(e)}
              />
              <InputP
                id="prevCSec"
                name="prevCSec"
                label="Total C-Section"
                value={record.prevCSec}
                type="number"
                placeholder=""
                handleChange={e => this.handleRecordChange(e)}
              />
            </div>
          </div>
          <div className="section">
            <p>Background</p>

            <TextArea
              label="Previous Deseases"
              value={record.prevDeseases}
              name="prevDeseases"
              handleChange={e => this.handleRecordChange(e)}
              placeholder=""
            />

            <TextArea
              label="Previous Surgeries"
              value={record.prevSurgery}
              name="prevSurgery"
              handleChange={e => this.handleRecordChange(e)}
              placeholder=""
            />

            <TextArea
              label="Drug Allergy"
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

            <div className="has-text-centered">
              <button type="submit" className="button is-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export const NewRecordForm = withRouter(connect()(_NewRecordForm));
