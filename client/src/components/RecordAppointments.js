import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const _RecordAppointments = ({ patient, user }) => {
  return (
    <React.Fragment>
      <div className="section">
        <p className="title is-5">Appointments</p>
      </div>
      {patient.recordId && user ? (
        <React.Fragment />
      ) : (
        <p>Appointments Empty</p>
      )}
    </React.Fragment>
  );
};

export const RecordAppointments = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordAppointments
  )
);
