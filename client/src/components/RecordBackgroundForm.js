import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";
import { Checkbox } from "./Checkbox";

import { Messages } from "./Messages";
import { TextArea } from "./TextArea";

class _RecordBackgroundForm extends React.Component {
  constructor() {
    super();
    this.state = {
      record: {
        backgroundDiseases: "",
        backgroundPsychiatricIll: "",
        backgroundAddictions: "",
        surgeries: "",
        allergies: "",
        addictions: "",
        contraceptive: "",
        STDovercome: false,
        pregnancies: 0,
        labours: 0,
        caesareanSections: 0,
        abortions: 0
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
    this.setState({ record: uptRecord }, () => {
      console.log(this.state.record.STDovercome);
    });
  }

  render() {
    let { record } = this.state;
    return (
      <React.Fragment>
        <div className="familiar-background">
          <p className="label">Familiar Background</p>
          <div className="field-wrapper section">
            <TextArea
              label="Diseases"
              value={record.backgroundDiseases}
              name="backgroundDiseases"
              handleChange={e => this.handleRecordChange(e)}
            />
            <TextArea
              label="Psychiatric Illness"
              value={record.backgroundPsychiatricIll}
              name="backgroundDiseases"
              handleChange={e => this.handleRecordChange(e)}
            />
            <TextArea
              label="Addictions"
              value={record.backgroundAddictions}
              name="backgroundAddictions"
              handleChange={e => this.handleRecordChange(e)}
            />
            <TextArea
              label="Reproductive Issues"
              value={record.backgroundReproductive}
              name="backgroundReproductive"
              handleChange={e => this.handleRecordChange(e)}
              help="Abortions, Sterility, Assisted Reproduction, Malformations, ..."
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
              help="Diseases, Cronical Illness, ..."
            />
            <TextArea
              label="Surgeries"
              value={record.surgeries}
              name="surgeries"
              handleChange={e => this.handleRecordChange(e)}
            />
            <TextArea
              label="Allergies"
              value={record.allergies}
              name="allergies"
              handleChange={e => this.handleRecordChange(e)}
              placeholder=""
            />
          </div>

          <div className="field">
            <p className="label">Addictions</p>
            <div className="field-wrapper section">
              <div class="control columns has-text-centered">
                <div className="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="addictions"
                      value="alcohol"
                      checked={record.addictions === "alcohol"}
                      onChange={e => this.handleRecordChange(e)}
                    />
                    <span> Alcohol</span>
                  </label>
                </div>
                <div className="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="addictions"
                      value="tobacco"
                      checked={record.addictions === "tobacco"}
                      onChange={e => this.handleRecordChange(e)}
                    />
                    <span> Tobacco</span>
                  </label>
                </div>
                <div className="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="addictions"
                      value="drugs"
                      checked={record.addictions === "drugs"}
                      onChange={e => this.handleRecordChange(e)}
                    />
                    <span> Drugs</span>
                  </label>
                </div>

                <div className="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="addictions"
                      value="none"
                      checked={record.addictions === "none"}
                      onChange={e => this.handleRecordChange(e)}
                    />
                    <span> None</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label className="label">Contraceptive</label>
            <div className="field-wrapper section">
              <div class="columns is-multiline is-mobile">
                <p>Falta checkboxes</p>
              </div>

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

          <div class="field">
            <label className="label">Sexual Transmited Diseases</label>
            <div className="field-wrapper section">
              <div class="columns is-multiline is-mobile">
                <p>Falta checkboxes</p>
              </div>

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
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="STDovercome"
                    value="currently"
                    checked={record.STDovercome === "currently"}
                    onChange={e => this.handleRecordChange(e)}
                  />
                  Currently
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="STDovercome"
                    value="NotCurrently"
                    checked={record.STDovercome === "NotCurrently"}
                    onChange={e => this.handleRecordChange(e)}
                  />
                  Not Currently
                </label>
              </div>
            </div>
            <div className="field-wrapper section">
              <InputP
                id="sexHabits"
                name="sexHabits"
                label="Sexual Habits"
                value={record.sexHabits}
                type="text"
                placeholder=""
                handleChange={e => this.handleRecordChange(e)}
              />
            </div>
          </div>
          <div class="field">
            <label className="label">HPV Vaccine</label>
            <div className="field-wrapper section">Checkbox</div>
            <div class="field">
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
          <div class="field">
            <label className="label">Blood Type</label>
            <div className="field-wrapper section">
              <div className="field-body">
                <div class="field">
                  <label class="label">Group</label>
                  <p class="control">
                    <div class="select">
                      <select>
                        <option />
                        <option>A</option>
                        <option>B</option>
                        <option>AB</option>
                        <option>O</option>
                      </select>
                    </div>
                  </p>
                </div>
                <div class="field">
                  <label class="label">RH</label>
                  <p class="control">
                    <div class="select">
                      <select>
                        <option />
                        <option>+</option>
                        <option>-</option>
                      </select>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
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

export const RecordBackgroundForm = withRouter(
  connect()(_RecordBackgroundForm)
);
