import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { RecordBackgroundForm } from "./RecordBackgroundForm";

const _RecordBackground = ({ patient, user }) => {
  return (
    <React.Fragment>
      <div className="section">
        {patient.recordId && user ? (
          <React.Fragment>
            <div className="level">
              <div className="level-left">
                <div className="leve-item">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="heading">Diseases</p>
                        <p className="is-6">{patient.recordId.diseases}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <div className="leve-item">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="heading">Surgeries</p>
                        <p className="is-6">{patient.recordId.surgeries}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <div className="leve-item">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="heading">Alergies</p>
                        <p className="is-6">{patient.recordId.alergies}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <div className="leve-item">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="heading">Risk History</p>
                        <p className="is-6">{patient.recordId.riskHistory}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <div className="leve-item">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="heading">Addictions</p>
                        <p className="is-6" />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <nav className="level">
              <div className="level-left">
                <div>
                  <p className="heading">Pregnancies</p>
                  <p className="title is-6">{patient.recordId.pregnancies}</p>
                  <p className="heading is-6">
                    Natural:{" "}
                    <span className="title is-7">
                      {patient.recordId.labours}
                    </span>
                  </p>
                  <p className="heading is-6">
                    C-Section:{" "}
                    <span className="title is-7">
                      {patient.recordId.caesareanSections}
                    </span>
                  </p>
                  <p className="heading is-6">
                    Pregnancy Loss:{" "}
                    <span className="title is-7">
                      {patient.recordId.abortions}
                    </span>
                  </p>
                </div>
              </div>
            </nav>
          </React.Fragment>
        ) : (
          <RecordBackgroundForm />
        )}
      </div>
    </React.Fragment>
  );
};

export const RecordBackground = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordBackground
  )
);
