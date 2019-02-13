import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ModalCard } from "./ModalCard";
import { PregnancyForm } from "./RecordPregnancyForm";
import { PregnancyDetail } from "./PregnancyDetail";

class _RecordPregnancy extends React.Component {
  render() {
    let { patient } = this.props;
    let { pregnanciesId } = patient.recordId;

    return (
      <div className="box">
        {pregnanciesId.length !== 0 ? (
          <div className="section">
            {pregnanciesId.map((pId, i) => (
              <div key={pId} className="section">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <p>Pregnancy {i + 1}</p>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <ModalCard title={`Pregnancy ${i + 1}`} button="View">
                        <PregnancyDetail id={pId} />
                      </ModalCard>
                    </div>
                    <div className="level-item">
                      <ModalCard
                        title={`Edit Pregnancy ${i + 1}`}
                        button="Edit"
                      >
                        <PregnancyForm />
                      </ModalCard>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No pregnancies in your record</p>
        )}
      </div>
    );
  }
}

export const RecordPregnancy = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPregnancy
  )
);
