import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import "bulma-pageloader";
import { Loader } from "./Loader";

const _Timeline = ({ patient }) => {
  return (
    <React.Fragment>
      {patient ? (
        <div className="box">
          <div className="timeline">
            {patient.recordId.visits.map((visit, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <p className="heading">
                    {moment(visit.date).format("dddd, Do MMM YYYY")}
                  </p>
                  <p className="heading">
                    Week{" "}
                    {moment(visit.date).diff(patient.recordId.LMP, "weeks")}
                  </p>

                  <div className="field-wrapper columns is-marginless">
                    <div className="column">
                      <p className="label">
                        Weight: {patient.recordId.weight[i].value}
                      </p>
                    </div>
                    <div className="column">
                      <p className="label">
                        IMC: {patient.recordId.IMC[i].value}
                      </p>
                    </div>

                    <div className="column">
                      <p className="label">
                        Blood Pressure:{" "}
                        {patient.recordId.bloodPressure[i].Systolic} /{" "}
                        {patient.recordId.bloodPressure[i].Diastolic}
                      </p>
                    </div>
                  </div>

                  <p className="label">Requested Test:</p>
                  {visit.medicalTest.map((test, i) => (
                    <p key={test + i}>{test}</p>
                  ))}
                  <p className="label">Test Results:</p>

                  <p className="label">Notes:{visit.notes}</p>

                  <p className="label">Recomendations: {visit.notesOut}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export const Timeline = withRouter(
  connect(store => ({ patient: store.patient }))(_Timeline)
);
