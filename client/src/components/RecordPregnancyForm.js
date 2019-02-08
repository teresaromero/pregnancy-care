import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { Messages } from "./Messages";


class _PregnancyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: {
        LMP: "",
        HPT: "",
        EDC: ""
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
    if (field === "LMP") {
      uptRecord[field] = moment(value).format("DD-MM-YYYY");
      uptRecord["EDC"] = moment(value)
        .clone()
        .add(40, "week")
        .format("YYYY-MM-DD");
      this.setState({ record: uptRecord }, () =>
        console.log(this.state.record)
      );
    }
    uptRecord[field] = value;
    this.setState({ record: uptRecord }, () => console.log(this.state.record));
  }

  render() {
    let { record } = this.state;
    return (
      <div className="section">
        <Messages />

        <div className="section">
          <div className="field-body">
            <InputP
              id="LMP"
              name="LMP"
              label="LMP"
              value={record.LMP}
              type="date"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="HPT"
              name="HPT"
              label="HPT"
              value={record.HPT}
              type="date"
              placeholder=""
              handleChange={e => this.handleRecordChange(e)}
            />
            <InputP
              id="EDC"
              name="EDC"
              label="EDC"
              value={record.EDC}
              type="date"
              placeholder=""
              disabled
            />
          </div>
          <div className="section">
            <div className="level">
              <div className="level-item">
                <p className="title is-6">
                  {moment().diff(record.LMP, "weeks")} weeks
                </p>
              </div>
            </div>
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

export const PregnancyForm = withRouter(connect()(_PregnancyForm));
