import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

class _RecordBackground extends React.Component {
  render() {
    let { patient } = this.props;
    let record = patient.recordId;

    return (
      <React.Fragment>
        {patient && record ? (
          <React.Fragment>
            <div className="field-wrapper section">
            
              <p className="label">Familiar Background:</p>
              <p>{record.background}</p>
              {record.background === "" ? (
                <p className="help has-text-danger">
                  Enter information about the family background
                </p>
              ) : null}
            </div>

            <div className="field-wrapper section">
              <p className="label">Patient Background:</p>
              <p>{record.patientBackground}</p>
              {record.patientBackground === "" ? (
                <span className="help has-text-danger">
                  Enter information about the patient background
                </span>
              ) : null}
            </div>

            <div className="field-wrapper section">
              <p className="label">
                {" "}
                <span role="img" aria-label="emoji">
                  ⚠️
                </span>{" "}
                Actual Addictions:
              </p>
              <p>
                {record.addictions.length === 0 ? (
                  <span className="help has-text-danger">
                    Enter information about the addictions
                  </span>
                ) : (
                  record.addictions.map(a => <span key={a}> {a}</span>)
                )}
              </p>
            </div>

            <div className="field-wrapper section">
              <p className="label"><span role="img" aria-label="emoji">
                  👫
                </span>{" "}Contraceptive Methods:</p>

              {record.contraceptive.length === 0 ? (
                <p className="help has-text-danger">
                  Enter information about the contraceptive methods
                </p>
              ) : (
                record.contraceptive.map(a => <span key={a}> {a}</span>)
              )}

            </div>

            <div className="field-wrapper section">
              <p className="label">STD:</p>

              {record.STD.length === 0 ? (
                <p className="help has-text-danger">
                  Enter information about the sexual transmited diseases methods
                </p>
              ) : (
                record.STD.map(a => <span key={a}> {a}</span>)
              )}


              
            </div>

            <div className="field-wrapper section">
              <div className="columns is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-half-mobile ">
                  <p className="label"><span role="img" aria-label="emoji">
                  💉
                </span>{" "}HPV Vaccine</p>
                  {record.HPVvaccine === "" ? (
                    <p className="help has-text-danger">Edit</p>
                  ) : (
                    <p>{record.HPVvaccine}</p>
                  )}
                </div>
                <div className="column is-half-mobile">
                  <p className="label"><span role="img" aria-label="emoji">
                  ⏰
                </span>{" "}Period Cycle</p>
                  {record.menstrualCycleDays ? (
                    <span>
                    {record.menstrualCycleDays}/
                    {record.menstrualCycleFrequency}
                  </span>
                    
                  ) : (
                    <p className="help has-text-danger">Edit</p>
                  )}
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Blood Type</p>

                  <span>
                    {record.bloodGroup} {record.rh}
                  </span>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Height</p>

                  <span>{record.height} cm</span>
                </div>
              </div>
            </div>

            <div className="field-wrapper section">
              <div className="columns has-text-centered is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-full-mobile">
                  <p className="label">Pregnancies</p>
                  <p>{record.pregnancies}</p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Labours</p>
                  <p>{record.labours}</p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">C-Sections</p>
                  <p>{record.caesareanSections}</p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Abortions</p>
                  <p>{record.abortions}</p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Ectopics</p>
                  <p>{record.ectopics}</p>
                </div>
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

export const RecordBackground = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordBackground
  )
);
