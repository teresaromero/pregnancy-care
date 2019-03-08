import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, closeModal } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { TextArea } from "./TextArea";
import CheckboxContainer from "./CheckboxContainer";

const optionsAddictions = ["alcohol", "tobacco", "drugs", "none"];
const optionsContraceptive = [
  "None",
  "Implant",
  "IUD",
  "Vaginal Ring",
  "Patch",
  "Pill",
  "Condom",
  "Diaphragm",
  "Other"
];
const optionsSTD = [
  "None",
  "Chlamydia",
  "Gonorrhea",
  "Hepatitis B",
  "Herpes",
  "VIH",
  "HPV",
  "Scabies",
  "Syphilis",
  "Trichomoniasis",
  "Other"
];
const optionsBlood = ["A", "B", "AB", "O"];
const optionsRH = ["-", "+"];

class _RecordBackgroundForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: null
    };
  }

  componentWillMount() {
   
    this.setState({ record: this.props.patient.recordId });
  }

  handleSave(e) {
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

  handleRecordChange(e) {
    let uptRecord = { ...this.state.record };
    let { value } = e.target;
    let field = e.target.name;
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
    let { patient } = this.props;
    return (
      <React.Fragment>
        {patient && record ? (
          <React.Fragment>
            <div className="box">
              <div className="field-wrapper section">
                <TextArea
                  label="Familiar Background"
                  value={record.background}
                  name="background"
                  handleChange={e => this.handleRecordChange(e)}
                  rows="4"
                  help="Diseases, Psychiatric Illness, Addictions, Abortions, Sterility, Assisted Reproduction, Malformations, ..."
                />
              </div>

              <div className="field-wrapper section">
                <TextArea
                  label="Patient Background"
                  value={record.patientBackground}
                  name="patientBackground"
                  handleChange={e => this.handleRecordChange(e)}
                  help="Diseases, Cronical Illness, Surgeries, Allergies"
                  rows="4"
                />
              </div>

              <div className="field-wrapper section">
                <p className="label">Addictions</p>
                <CheckboxContainer
                  options={optionsAddictions}
                  selection={s => this.handleSelection(s, "addictions")}
                />
              </div>

              <div className="field-wrapper section">
                <p className="label">Contraceptive</p>
                <CheckboxContainer
                  options={optionsContraceptive}
                  selection={s => this.handleSelection(s, "contraceptive")}
                />

                <InputP
                  id="contraceptiveOther"
                  name="contraceptiveOther"
                  label="Other Contraceptive"
                  value={record.contraceptiveOther}
                  type="text"
                  placeholder=""
                  handleChange={e => this.handleRecordChange(e)}
                />
              </div>

              <div className="field-wrapper section">
                <p className="label">Sexual Transmited Diseases</p>

                <CheckboxContainer
                  options={optionsSTD}
                  selection={s => this.handleSelection(s, "STD")}
                />
                <div className="columns is-marginless is-paddingless">
                  <div className="column">
                    <InputP
                      id="STDother"
                      name="STDother"
                      label="Other STD"
                      value={record.STDother}
                      type="text"
                      placeholder=""
                      handleChange={e => this.handleRecordChange(e)}
                    />
                  </div>
                  <div className="column is-one-quarter">
                    <p className="label">STD Overcome</p>
                    <div className="control">
                      <label className="radio">
                        <input
                          type="radio"
                          name="STDovercome"
                          value="Yes"
                          checked={record.STDovercome === "Yes"}
                          onChange={e => this.handleRecordChange(e)}
                        />
                        <span> Yes</span>
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="STDovercome"
                          value="No"
                          checked={record.STDovercome === "No"}
                          onChange={e => this.handleRecordChange(e)}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-wrapper section">
                <div className="columns is-marginless is-paddingless">
                  <div className="column has-text-centered">
                    <p className="label">HPV Vaccine</p>
                    <div className="control">
                      <label className="radio">
                        <input
                          type="radio"
                          name="HPVvaccine"
                          value="Yes"
                          checked={record.HPVvaccine === "Yes"}
                          onChange={e => this.handleRecordChange(e)}
                        />
                        <span> Yes</span>
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="HPVvaccine"
                          value="No"
                          checked={record.HPVvaccine === "No"}
                          onChange={e => this.handleRecordChange(e)}
                        />
                        <span> No</span>
                      </label>
                    </div>
                  </div>

                  <div className="column has-text-centered">
                    <p className="label">Period Cycle</p>
                    <InputP
                      id="menstrualCycleDays"
                      name="menstrualCycleDays"
                      label="Duration (Days)"
                      value={record.menstrualCycleDays}
                      type="number"
                      handleChange={e => this.handleRecordChange(e)}
                    />

                    <InputP
                      id="menstrualCycleFrequency"
                      name="menstrualCycleFrequency"
                      label="Frequency (Days)"
                      value={record.menstrualCycleFrequency}
                      type="number"
                      handleChange={e => this.handleRecordChange(e)}
                    />
                  </div>

                  <div className="column ">
                    <p className="label has-text-centered">Blood Type</p>

                    <p className="label">Group</p>
                    <div className="control">
                      <div className="select">
                        <select
                          name="bloodGroup"
                          value={record.bloodGroup}
                          onChange={e => this.handleRecordChange(e)}
                        >
                          {optionsBlood.map(type => (
                            <option value={type} key={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="label">RH</p>
                    <div className="control">
                      <div className="select ">
                        <select
                          name="rh"
                          value={record.rh}
                          onChange={e => this.handleRecordChange(e)}
                        >
                          {optionsRH.map(type => (
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

              <div className="field-wrapper section">
                <p className="label">Height (cm)</p>
                <InputP
                  id="height"
                  name="height"
                  value={record.height}
                  type="number"
                  handleChange={e => this.handleRecordChange(e)}
                  min={0}
                  help="This value is used for IMC calculation"
                />
              </div>

              <div className="field-wrapper section">
                <div className="columns is-marginless is-paddingless">
                  <div className="column">
                    <InputP
                      id="pregnancies"
                      name="pregnancies"
                      label="Pregnancies"
                      value={record.pregnancies}
                      type="number"
                      handleChange={e => this.handleRecordChange(e)}
                      min={0}
                    />
                  </div>
                  <div className="column">
                    <InputP
                      id="labours"
                      name="labours"
                      label="Labours"
                      value={record.labours}
                      type="number"
                      handleChange={e => this.handleRecordChange(e)}
                      min={0}
                    />
                  </div>
                  <div className="column">
                    <InputP
                      id="caesareanSections"
                      name="caesareanSections"
                      label="C-Section"
                      value={record.caesareanSections}
                      type="number"
                      handleChange={e => this.handleRecordChange(e)}
                      min={0}
                    />
                  </div>
                  <div className="column">
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
                  <div className="column">
                    <InputP
                      id="ectopics"
                      name="ectopics"
                      label="Ectopics"
                      value={record.ectopics}
                      type="number"
                      placeholder=""
                      handleChange={e => this.handleRecordChange(e)}
                    />
                  </div>
                </div>
                <p className="help">Reproductive background of patient</p>
              </div>

              <div className="section has-text-centered">
                <button
                  className="button is-primary"
                  onClick={e => this.handleSave(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <p>Loading</p>
        )}
      </React.Fragment>
    );
  }
}

export const RecordBackgroundForm = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordBackgroundForm)
);
