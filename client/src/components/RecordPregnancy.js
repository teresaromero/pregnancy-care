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
      <React.Fragment>
        <ModalCard title="Add Pregnancy">
          <PregnancyForm />
        </ModalCard>

        {pregnanciesId.length !== 0 ? (
          <div className="section">
            {pregnanciesId.map((pId, i) => (
              <div key={pId} className="section">
                <ModalCard title={`Pregnancy ${i + 1}`}>
                  <PregnancyDetail id={pId} />
                </ModalCard>
              </div>
            ))}
          </div>
        ) : (
          <p>No pregnancies in your record</p>
        )}
      </React.Fragment>
    );
  }
}

export const RecordPregnancy = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPregnancy
  )
);
