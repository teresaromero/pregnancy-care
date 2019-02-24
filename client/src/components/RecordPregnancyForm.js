import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, closeModal } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import CheckboxContainer from "./CheckboxContainer";
import { Loader } from "./Loader";

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

class _RecordPregnancyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: {}
    };
  }

  componentWillMount() {
    let { patient } = this.props;

    this.setState({ record: patient.recordId });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { record } = this.state;
    const { dispatch, patient } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    PatientsApi.updateRecord(record, record._id, patient._id).then(res => {
      dispatch(viewPatient(res.patient));
      dispatch(closeModal());
    });
  }

  handleFieldChange(e) {
    let uptRecord = { ...this.state.record };
    let { value } = e.target;
    let field = e.target.name;
    if (field === "LMP") {
      uptRecord[field] = moment(value).format("YYYY-MM-DD");
      uptRecord["EDC"] = moment(value)
        .clone()
        .add(7, "days")
        .subtract(3, "months")
        .add(1, "years")
        .format("YYYY-MM-DD");
      this.setState({ record: uptRecord });
    }
    uptRecord[field] = value;
    this.setState({ record: uptRecord });
  }

  handleSelection(s, field) {
    let uptRecord = { ...this.state.record };
    let selected = [];
    s.forEach((v, k) => {
      if (v) {
        selected.push(k);
      }
    });
    uptRecord[field] = selected;
    this.setState({ record: uptRecord });
  }

  render() {
    let { record } = this.state;
    return (
      <React.Fragment>
        {record ? (
          <React.Fragment>
            <div className="box">
              <div className="section">
                <p className="label" />
                <div className="field-wrapper section">
                  <div className="columns has-text-centered">
                    <div className="column">
                      <InputP
                        id="LMP"
                        name="LMP"
                        label="LMP"
                        value={record.LMP}
                        type="date"
                        placeholder=""
                        handleChange={e => this.handleFieldChange(e)}
                      />
                      <InputP
                        id="HPT"
                        name="HPT"
                        label="HPT"
                        value={record.HPT}
                        type="date"
                        placeholder=""
                        handleChange={e => this.handleFieldChange(e)}
                      />
                    </div>
                    <div className="column">
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
                    <div className="column" />
                    <div className="column">
                      <p className="label">Weeks</p>
                      <p className=""> {moment().diff(record.LMP, "weeks")}</p>
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
                    value={moment(record.partnerBirthDate).format("YYYY-MM-DD")}
                    type="date"
                    handleChange={e => this.handleFieldChange(e)}
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
                          value={record.pregnancyType}
                          onChange={e => this.handleFieldChange(e)}
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
                              value={record.diet}
                              onChange={e => this.handleFieldChange(e)}
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
                    {record.diet === "Other" ? (
                      <div className="column">
                        <InputP
                          id="dietOther"
                          name="dietOther"
                          label="Other Diet"
                          value={record.dietOther}
                          type="text"
                          handleChange={e => this.handleFieldChange(e)}
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
                    value={record.sport}
                    type="text"
                    handleChange={e => this.handleFieldChange(e)}
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
                              value={record.risk}
                              onChange={e => this.handleFieldChange(e)}
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
                        value={record.riskReason}
                        type="text"
                        handleChange={e => this.handleFieldChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="has-text-centered">
                <button
                  className="button is-primary"
                  onClick={e => this.handleUpdate(e)}
                >
                  Update
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const RecordPregnancyForm = withRouter(
  connect(store => ({
    patient: store.patient
  }))(_RecordPregnancyForm)
);
