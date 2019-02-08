import React from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

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
