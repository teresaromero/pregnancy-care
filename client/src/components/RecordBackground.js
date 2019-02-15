import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class _RecordBackground extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let { patient } = this.props;
    let record = patient.recordId;

    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <div className="box">
              <p className="label">Familiar</p>
              <div className="field-wrapper section">
                <p className="label">Diseases</p>
                <p>{record.backgroundDiseases || "N/A"}</p>
                <p className="label">Psychiatric Illness</p>
                <p>{record.backgroundPsychiatricIll || "N/A"}</p>
                <p className="label">Addictions</p>
                <p>{record.backgroundAddictions || "N/A"}</p>
                <p className="label">Reproductive Issues</p>
                <p>{record.backgroundReproductive || "N/A"}</p>
              </div>
            </div>

            <div className="box">
              <p className="label">Patient</p>
              <div className="field-wrapper section">
                <p className="label">Diseases</p>
                <p>{record.diseases || "N/A"}</p>
                <p className="label">Allergies</p>
                <p>{record.allergies || "N/A"}</p>
                <p className="label">Addictions</p>
                <p>
                  {record.addictions.length === 0
                    ? ""
                    : record.addictions.map(a => <span key={a}>{a}</span>)}
                </p>
                <p className="label">Contraceptive Methods</p>
                <p>
                  {record.contraceptive.length === 0
                    ? ""
                    : record.contraceptive.map(a => <span key={a}>{a}</span>)}
                </p>
                <p>
                  {record.contraceptiveOther === "" ? (
                    "N/A"
                  ) : (
                    <span>Other: {record.contraceptiveOther}</span>
                  )}
                </p>
                <p className="label">STD</p>
                <p>
                  {record.STD.length === 0
                    ? "N/A"
                    : record.STD.map(a => <span key={a}>{a}</span>)}
                </p>
                <p>
                  {record.STDother === "" ? (
                    "N/A"
                  ) : (
                    <span>Other: {record.STDother}</span>
                  )}
                </p>
                <p>STD Status: {record.STDovercome || "N/A"}</p>
              </div>
            </div>
            <div className="box">
              <div className="columns">
                <div className="column">
                  <p className="label">HPV Vaccine</p>
                  <div className="field-wrapper section">
                    {record.HPVvaccine || "N/A"}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Period Cycle</p>
                  <div className="field-wrapper section">
                    {record.menstrualCycleDays || "N/A"}/
                    {record.menstrualCycleFrequency || "N/A"}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Blood Type</p>
                  <div className="field-wrapper section">
                    {record.bloodGroup || "N/A"} {record.rh || "N/A"}
                  </div>
                </div>
                <div className="column">
                  <p className="label">Height</p>
                  <div className="field-wrapper section">
                    {record.height || "N/A"} cm
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <p className="label">Pregnancy History</p>
              <div className="field-wrapper section">
                <div className="columns has-text-centered">
                  <div className="column">
                    <p className="label">Pregnancies</p>
                    <p>{record.pregnancies || 0}</p>
                  </div>
                  <div className="column">
                    <p className="label">Labours</p>
                    <p>{record.labours || 0}</p>
                  </div>
                  <div className="column">
                    <p className="label">C-Sections</p>
                    <p>{record.caesareanSections || 0}</p>
                  </div>
                  <div className="column">
                    <p className="label">Abortions</p>
                    <p>{record.abortions || 0}</p>
                  </div>
                  <div className="column">
                    <p className="label">Ectopics</p>
                    <p>{record.ectopics || 0}</p>
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
