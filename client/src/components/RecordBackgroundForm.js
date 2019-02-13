import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

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
  "Genital Warts (HPV)",
  "Gonorrhea",
  "Hepatitis B",
  "Herpes",
  "VIH",
  "HPV",
  "Molluscum Contagiosum",
  "Pubic Lice",
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
    console.log("montando");
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
      this.props.handleClose();
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
        {patient ? (
          <React.Fragment>
            <div className="familiar-background">
              <p className="label">Familiar Background</p>
              <div className="field-wrapper section">
                <TextArea
                  label="Diseases"
                  value={record.backgroundDiseases}
                  name="backgroundDiseases"
                  handleChange={e => this.handleRecordChange(e)}
                  rows="2"
                />
                <TextArea
                  label="Psychiatric Illness"
                  value={record.backgroundPsychiatricIll}
                  name="backgroundPsychiatricIll"
                  handleChange={e => this.handleRecordChange(e)}
                  rows="2"
                />
                <TextArea
                  label="Addictions"
                  value={record.backgroundAddictions}
                  name="backgroundAddictions"
                  handleChange={e => this.handleRecordChange(e)}
                  rows="2"
                />
                <TextArea
                  label="Reproductive Issues"
                  value={record.backgroundReproductive}
                  name="backgroundReproductive"
                  handleChange={e => this.handleRecordChange(e)}
                  help="Abortions, Sterility, Assisted Reproduction, Malformations, ..."
                  rows="2"
                />
              </div>
            </div>
            <div className="patient-background">
              <p className="label">Patient Background</p>
              <div className="field-wrapper section">
                <TextArea
                  label="Diseases"
                  value={record.diseases}
                  name="diseases"
                  handleChange={e => this.handleRecordChange(e)}
                  help="Diseases, Cronical Illness, Surgeries..."
                  rows="2"
                />
                <TextArea
                  label="Allergies"
                  value={record.allergies}
                  name="allergies"
                  handleChange={e => this.handleRecordChange(e)}
                  rows="2"
                />
              </div>

              <div className="field">
                <p className="label">Addictions</p>
                <div className="field-wrapper section">
                  <CheckboxContainer
                    options={optionsAddictions}
                    selection={s => this.handleSelection(s, "addictions")}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Contraceptive</label>
                <div className="field-wrapper section">
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
              </div>

              <div className="field">
                <label className="label">Sexual Transmited Diseases</label>
                <div className="field-wrapper section">
                  <CheckboxContainer
                    options={optionsSTD}
                    selection={s => this.handleSelection(s, "STD")}
                  />

                  <InputP
                    id="STDother"
                    name="STDother"
                    label="Other STD"
                    value={record.STDother}
                    type="text"
                    placeholder=""
                    handleChange={e => this.handleRecordChange(e)}
                  />

                  <label className="label">STD Overcome</label>
                  <div className="control">
                    <label className="radio">
                      <input
                        type="radio"
                        name="STDovercome"
                        value="currently"
                        checked={record.STDovercome === "currently"}
                        onChange={e => this.handleRecordChange(e)}
                      />
                      <span> Currently</span>
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="STDovercome"
                        value="NotCurrently"
                        checked={record.STDovercome === "NotCurrently"}
                        onChange={e => this.handleRecordChange(e)}
                      />
                      <span> Not Currently</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">HPV Vaccine</label>
                    <div className="field-wrapper section">
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
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <label className="label">Period Cycle</label>
                    <div className="field-wrapper section">
                      <div className="field-body">
                        <InputP
                          id="menstrualCycleDays"
                          name="menstrualCycleDays"
                          label="Duration (Days)"
                          value={record.menstrualCycleDays}
                          type="number"
                          placeholder=""
                          handleChange={e => this.handleRecordChange(e)}
                        />
                        <InputP
                          id="menstrualCycleFrequency"
                          name="menstrualCycleFrequency"
                          label="Frequency (Days)"
                          value={record.menstrualCycleFrequency}
                          type="number"
                          placeholder=""
                          handleChange={e => this.handleRecordChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Blood Type</label>
                    <div className="field-wrapper section">
                      <div className="field-body">
                        <div className="field">
                          <label className="label">Group</label>
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
                        </div>

                        <div className="field">
                          <label className="label">RH</label>
                          <div className="control">
                            <div className="select">
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
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Height (cm)</label>
                <div className="field-wrapper section">
                  <InputP
                    id="height"
                    name="height"
                    value={record.height}
                    type="number"
                    placeholder=""
                    handleChange={e => this.handleRecordChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Pregnancy History</label>
                <div className="field-wrapper section">
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
                      label="Labours"
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
              </div>
            </div>

            <div className="section has-text-centered">
              <button
                className="button is-primary"
                onClick={e => this.handleSave(e)}
              >
                Save
              </button>
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
