import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PregnancyForm } from "./RecordPregnancyForm";

const _RecordPregnancy = ({ patient, user }) => {
  return (
    <React.Fragment>
      <div className="section">
        <p className="title is-5">Pregnancy</p>
      </div>
      {patient.recordId && user ? (
        <React.Fragment>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">LMP</p>
                <p className="title is-6">
                  {moment(patient.recordId.LMP).format("Do MMM YY")}
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">EDC</p>
                <p className="title is-6">
                  {moment(patient.recordId.EDC).format("Do MMM YY")}
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="title is-6">
                  {moment().diff(patient.recordId.LMP, "weeks")} weeks
                </p>
              </div>
            </div>
          </nav>
        </React.Fragment>
      ) : (
        <PregnancyForm />
      )}
    </React.Fragment>
  );
};

export const RecordPregnancy = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPregnancy
  )
);
