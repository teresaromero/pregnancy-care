import React from "react";
import moment, { now } from "moment";
import 'moment-precise-range-plugin';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const _RecordView = ({ patient }) => {
  return (
    <React.Fragment>
      {patient ? (
        <React.Fragment>
          <div className="section">
            <div className="columns is-marginless is-paddingless">
              <div className="column">
                <p>Last Menstruation Date</p>
                <p>
                  {moment(patient.recordId.lastMenstruationDate).format(
                    "Do MMM YY"
                  )}
                </p>
                <p>Birth Date</p>
                <p>
                  {moment(patient.recordId.birthDate).format(
                    "Do MMM YY"
                  )}
                </p>
                <p>Actual Time</p>
                <p>
                  {moment().diff(patient.recordId.lastMenstruationDate,"weeks")} weeks
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <p>loading</p>
      )}
    </React.Fragment>
  );
};

export const RecordView = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordView)
);
