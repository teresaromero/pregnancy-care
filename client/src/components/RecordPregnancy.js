import React from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

const _RecordPregnancy = ({ patient, user }) => {
  return (
    <React.Fragment>
      <div className="section">
        <p className="title is-5">Pregnancy</p>
      </div>
      {patient.recordId && user ? (
        <React.Fragment>
          <nav class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">LMP</p>
                <p class="title is-6">
                  {moment(patient.recordId.LMP).format("Do MMM YY")}
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">EDC</p>
                <p class="title is-6">
                  {moment(patient.recordId.EDC).format("Do MMM YY")}
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title is-6">
                  {moment().diff(patient.recordId.LMP, "weeks")} weeks
                </p>
              </div>
            </div>
          </nav>
        </React.Fragment>
      ) : (
        <p>Pregnancy empty</p>
      )}
    </React.Fragment>
  );
};

export const RecordPregnancy = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPregnancy
  )
);
