import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import CheckboxContainer from "./CheckboxContainer";

const optionsPregnancy = [
  "",
  "Spontaneus",
  "In Vitro - Derived",
  "In Vitro - Generated",
  "Artificial Insemination - Donor",
  "Artificial Insemination - Partner"
];

const optionsDiet = ["", "Mediterranean", "Vegetarian", "Vegan", "Other"];

const optionsSuplements = ["polivitaminics", "iron", "folic", "iodine", "none"];

const optionsWorkRisk = [
  "noise",
  "weight lifting",
  "stress",
  "toxics",
  "cold",
  "standing up",
  "none"
];

const optionsRisk = ["", "Low", "High"];

class _PregnancyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      pregnancyRecord: {}
    };
  }

  handleSave(e) {
    e.preventDefault();
    const { pregnancyRecord } = this.state;
    const { dispatch,patient } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }
    PatientsApi.newPregnancy(pregnancyRecord, patient.recordId).then(res => {
      
      dispatch(viewPatient(res.patient));
      this.props.handleClose();
    });
  }

  handleRecordChange(e) {
    let uptRecord = { ...this.state.pregnancyRecord };
    let { value } = e.target;
    let field = e.target.name;
    if (field === "LMP") {
      uptRecord[field] = moment(value).format("DD-MM-YYYY");
      uptRecord["EDC"] = moment(value)
        .clone()
        .add(7, "days")
        .subtract(3, "months")
        .add(1, "years")
        .format("YYYY-MM-DD");
      this.setState({ pregnancyRecord: uptRecord });
    }
    uptRecord[field] = value;
    this.setState({ pregnancyRecord: uptRecord });
  }

  handleSelection(s, field) {
    let uptRecord = { ...this.state.pregnancyRecord };
    let selected = [];
    s.forEach((v, k) => {
      if (v) {
        selected.push(k);
      }
    });
    uptRecord[field] = selected;
    this.setState({ pregnancyRecord: uptRecord });
  }

  render() {
    let { pregnancyRecord } = this.state;
    return (
      <React.Fragment>
        <div className="section">
          <p className="label" />
          <div className="field-wrapper section">
            <div className="columns has-text-centered">
              <div className="column">
                <InputP
                  id="LMP"
                  name="LMP"
                  label="LMP"
                  value={pregnancyRecord.LMP}
                  type="date"
                  placeholder=""
                  handleChange={e => this.handleRecordChange(e)}
                />
                <InputP
                  id="HPT"
                  name="HPT"
                  label="HPT"
                  value={pregnancyRecord.HPT}
                  type="date"
                  placeholder=""
                  handleChange={e => this.handleRecordChange(e)}
                />
              </div>
              <div className="column">
                <InputP
                  id="EDC"
                  name="EDC"
                  label="EDC"
                  value={pregnancyRecord.EDC}
                  type="date"
                  placeholder=""
                  disabled
                />
              </div>
              <div className="column" />
              <div className="column">
                <p className="label">Weeks</p>
                <p className="">
                  {" "}
                  {moment().diff(pregnancyRecord.LMP, "weeks")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <p className="label" />
          <div className="field-wrapper section">
            <InputP
              id="partnerBirthDate"
              name="partnerBirthDate"
              label="Partner Born Date"
              value={moment(pregnancyRecord.partnerBirthDate).format(
                "YYYY-MM-DD"
              )}
              type="date"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
        </div>

        <div className="section">
          <p className="label" />
          <div className="field-wrapper section">
            <div className="field">
              <label className="label">Pregnancy Type</label>
              <div className="control">
                <div className="select">
                  <select
                    name="pregnancyType"
                    value={pregnancyRecord.pregnancyType}
                    onChange={e => this.handleRecordChange(e)}
                  >
                    {optionsPregnancy.map(type => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <p className="label" />
          <div className="field-wrapper section">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Diet</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="diet"
                        value={pregnancyRecord.diet}
                        onChange={e => this.handleRecordChange(e)}
                      >
                        {optionsDiet.map(type => (
                          <option value={type} key={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {pregnancyRecord.diet === "Other" ? (
                <div className="column">
                  <InputP
                    id="dietOther"
                    name="dietOther"
                    label="Other Diet"
                    value={pregnancyRecord.dietOther}
                    type="text"
                    handleChange={e => this.handleRecordChange(e)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Diet Suplements</label>
          <div className="field-wrapper section">
            <CheckboxContainer
              options={optionsSuplements}
              selection={s => this.handleSelection(s, "dietSuplements")}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" />
          <div className="field-wrapper section">
            <InputP
              id="sport"
              name="sport"
              label="Sports"
              value={pregnancyRecord.sport}
              type="text"
              handleChange={e => this.handleRecordChange(e)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Work Risk</label>
          <div className="field-wrapper section">
            <CheckboxContainer
              options={optionsWorkRisk}
              selection={s => this.handleSelection(s, "workRisk")}
            />
          </div>
        </div>

        <div className="section">
          <p className="label" />
          <div className="field-wrapper section">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Pregnancy Risk</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="risk"
                        value={pregnancyRecord.risk}
                        onChange={e => this.handleRecordChange(e)}
                      >
                        {optionsRisk.map(type => (
                          <option value={type} key={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <InputP
                  id="riskReason"
                  name="riskReason"
                  label="Reason"
                  value={pregnancyRecord.riskReason}
                  type="text"
                  handleChange={e => this.handleRecordChange(e)}
                />
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
      </React.Fragment>
    );
  }
}

export const PregnancyForm = withRouter(
  connect(store => ({ patient: store.patient }))(_PregnancyForm)
);
