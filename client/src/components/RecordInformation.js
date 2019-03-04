import React from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

const _RecordInformation = ({ patient }) => {
  return (
    <React.Fragment>
      {patient ? (
        <React.Fragment>
          <div className="field-wrapper">
            <div className="columns is-marginless is-paddingless is-mobile is-multiline">
              <div className="column is-one-third">
                <p className="label">Name and surname</p>
                <p>
                  {patient.name} {patient.surname}
                </p>
              </div>
              <div className="column is-one-third">
                <p className="label">ID</p>
                <p>{patient.idNum}</p>
              </div>
              <div className="column is-one-third">
                <p className="label">Born Date</p>
                <p>
                  {moment(patient.bornDate).format("Do MMM YY")} (
                  {moment().diff(patient.bornDate, "years")} years)
                </p>
              </div>
            </div>

            <div className="columns is-marginless is-paddingless is-mobile is-multiline">
              <div className="column is-half-mobile">
                <p className="label">Address</p>
                <p className="is-marginless">
                  {patient.address.street} <span>{patient.address.number}</span>
                </p>
                <p className="is-marginless">
                  {patient.address.city} <span>{patient.address.zip}</span>
                </p>
                <p className="is-marginless">{patient.address.state}</p>
              </div>
              <div className="column is-half-mobile">
                <p className="label">Phone</p>
                <p>{patient.phone}</p>
              </div>
              <div className="column is-half-mobile">
                <p className="label">Email</p>
                <p>{patient.email}</p>
              </div>
              <div className="column is-half-mobile">
                <p className="label">Insurance Company</p>
                <p>{patient.insurance}</p>
                <p>Policy Nª{patient.insNumber}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export const RecordInformation = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordInformation)
);
