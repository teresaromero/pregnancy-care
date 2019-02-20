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
            <div className="field-wrapper section">
              <p className="label">Familiar Background:</p>
              <p>{record.backgroundDiseases}</p>
              <p className="help">Help Text</p>
            </div>

            <div className="field-wrapper section">
              <p className="label">Patient Background:</p>
              <p>{record.diseases}</p>
            </div>

            <div className="field-wrapper section">
              <p className="label">Actual Addictions:</p>
              <p>
                {record.addictions.length === 0
                  ? "None"
                  : record.addictions.map(a => <span key={a}>{a}</span>)}
              </p>
            </div>

            <div className="field-wrapper section">
              <p className="label">Contraceptive Methods:</p>
              <p>
                {record.contraceptive.length === 0
                  ? ""
                  : record.contraceptive.map(a => <span key={a}>{a}</span>)}
              </p>
              <p>
                {record.contraceptiveOther === "" ? (
                  ""
                ) : (
                  <span>Other: {record.contraceptiveOther}</span>
                )}
              </p>
            </div>

            <div className="field-wrapper section">
              <p className="label">STD:</p>
              <p>
                {record.STD.length === 0
                  ? ""
                  : record.STD.map(a => <span key={a}> {a}</span>)}
              </p>
              <p>
                {record.STDother === "" ? (
                  ""
                ) : (
                  <span>Other: {record.STDother}</span>
                )}
              </p>
              <p className="label">STD Overcome:</p>
              <p>{record.STDovercome}</p>
            </div>

            <div className="field-wrapper section">
              <div className="columns">
                <div className="column">
                  <p className="label">HPV Vaccine</p>

                  {record.HPVvaccine}
                </div>
                <div className="column">
                  <p className="label">Period Cycle</p>

                  <span>
                    {record.menstrualCycleDays}/{record.menstrualCycleFrequency}
                  </span>
                </div>
                <div className="column">
                  <p className="label">Blood Type</p>

                  <span>
                    {record.bloodGroup} {record.rh}
                  </span>
                </div>
                <div className="column">
                  <p className="label">Height</p>

                  <span>{record.height} cm</span>
                </div>
              </div>
            </div>

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
