import React from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

const _RecordPreconceptional = ({ patient, user }) => {
  return (
    <React.Fragment>
      <div className="section">
        <p className="title is-5">Preconceptional</p>
      </div>
      {patient.recordId && user ? (
        <React.Fragment>
          <div className="level">
            <div className="level-left">
              <div className="leve-item">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
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
                <article class="media">
                  <div class="media-content">
                    <div class="content">
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
                <article class="media">
                  <div class="media-content">
                    <div class="content">
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
                <article class="media">
                  <div class="media-content">
                    <div class="content">
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
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p className="heading">Addictions</p>
                      <p className="is-6" />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <nav class="level">
            <div class="level-left">
              <div>
                <p class="heading">Pregnancies</p>
                <p class="title is-6">{patient.recordId.pregnancies}</p>
                <p class="heading is-6">
                  Natural:{" "}
                  <span class="title is-7">{patient.recordId.labours}</span>
                </p>
                <p class="heading is-6">
                  C-Section:{" "}
                  <span class="title is-7">
                    {patient.recordId.caesareanSections}
                  </span>
                </p>
                <p class="heading is-6">
                  Pregnancy Loss:{" "}
                  <span class="title is-7">{patient.recordId.abortions}</span>
                </p>
              </div>
            </div>
          </nav>
        </React.Fragment>
      ) : (
        <p>Preconceptional empty</p>
      )}
    </React.Fragment>
  );
};

export const RecordPreconceptional = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPreconceptional
  )
);
