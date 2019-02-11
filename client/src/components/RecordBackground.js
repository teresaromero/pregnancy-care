import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ModalCard } from "./ModalCard";
import { RecordBackgroundForm } from "./RecordBackgroundForm";

class _RecordBackground extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  openModal() {
    this.setState({ edit: true });
  }

  closeModal() {
    this.setState({ edit: false });
  }

  render() {
    let { patient } = this.props;
    let record = patient.recordId;
    let { edit } = this.state;
    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <button
              className="button is-rounded"
              onClick={() => this.openModal()}
            >
              <span className="icon is-small">
                <i className="fas fa-edit" />
              </span>
            </button>
            <ModalCard
              title="Edit Background"
              isActive={edit}
              handleClose={() => this.closeModal()}
            >
              <RecordBackgroundForm
                handleClose={() => this.closeModal()}
                handleSave={record => this.saveUpdate(record)}
              />
            </ModalCard>
            <div className="section">
              <p className="label">Familiar</p>
              <div className="field-wrapper section">
                <p className="label">Diseases</p>
                <p>
                  {record.backgroundDiseases === ""
                    ? "Empty"
                    : record.backgroundDiseases}
                </p>
                <p className="label">Psychiatric Illness</p>
                <p>
                  {record.backgroundPsychiatricIll === ""
                    ? "Empty"
                    : record.backgroundPsychiatricIll}
                </p>
                <p className="label">Addictions</p>
                <p>
                  {record.backgroundAddictions === ""
                    ? "Empty"
                    : record.backgroundAddictions}
                </p>
                <p className="label">Reproductive Issues</p>
                <p>
                  {record.backgroundReproductive === ""
                    ? "Empty"
                    : record.backgroundReproductive}
                </p>
              </div>
            </div>

            <div className="section">
              <p className="label">Patient</p>
              <div className="field-wrapper section">
                <p className="label">Diseases</p>
                <p>{record.diseases === "" ? "Empty" : record.diseases}</p>
                <p className="label">Allergies</p>
                <p>{record.allergies === "" ? "Empty" : record.allergies}</p>
                <p className="label">Addictions</p>
                <p>
                  {record.addictions.length === 0
                    ? "Empty"
                    : record.addictions.map(a => <span key={a}>{a}</span>)}
                </p>
                <p className="label">Contraceptive Methods</p>
                <p>
                  {record.contraceptive.length === 0
                    ? "Empty"
                    : record.contraceptive.map(a => <span key={a}>{a}</span>)}
                </p>
                <p>
                  {record.contraceptiveOther === "" ? (
                    ""
                  ) : (
                    <span>Other: {record.contraceptiveOther}</span>
                  )}
                </p>
                <p className="label">STD</p>
                <p>
                  {record.STD.length === 0
                    ? "Empty"
                    : record.STD.map(a => <span>{a}</span>)}
                </p>
                <p>
                  {record.STDother === "" ? (
                    ""
                  ) : (
                    <span>Other: {record.STDother}</span>
                  )}
                </p>
                <p>Ended?: {record.STDovercome}</p>
              </div>
            </div>
            <div className="section">
              <div className="columns">
                <div className="column">
                  <p className="label">HPV Vaccine</p>
                  <div className="field-wrapper section">
                    {record.HPVvaccine}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Period Cycle</p>
                  <div className="field-wrapper section">
                    {record.menstrualCycleDays}/{record.menstrualCycleFrequency}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Blood Type</p>
                  <div className="field-wrapper section">
                    {record.bloodGroup} {record.rh}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Height</p>
                  <div className="field-wrapper section">
                    {record.height} cm
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <p className="label">Pregnancy History</p>
              <div className="field-wrapper section">
                <div className="columns has-text-centered">
                  <div className="column">
                    <p className="label">Pregnancies</p>
                    <p>{record.pregnancies}</p>
                  </div>
                  <div className="column">
                    <p className="label">Labours</p>
                    <p>{record.labours}</p>
                  </div>
                  <div className="column">
                    <p className="label">C-Sections</p>
                    <p>{record.caesareanSections}</p>
                  </div>
                  <div className="column">
                    <p className="label">Abortions</p>
                    <p>{record.abortions}</p>
                  </div>
                  <div className="column">
                    <p className="label">Ectopics</p>
                    <p>{record.ectopics}</p>
                  </div>
                </div>
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

export const RecordBackground = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordBackground
  )
);
