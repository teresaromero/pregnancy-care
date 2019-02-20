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
        <div className="timeline">
          {patient.recordId.visits.map((visit, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <p className="heading">
                  {moment(visit.date).format("dddd, Do MMM YYYY")}
                </p>
                <p className="heading">
                  Week {moment(visit.date).diff(patient.recordId.LMP, "weeks")}
                </p>

                <div className="field-wrapper columns is-marginless">
                  <div className="column">
                    <p>Weight: {patient.recordId.weight[i].value} kg</p>
                  </div>
                  <div className="column">
                    {patient.recordId.IMC[i].value > 18.5 &&
                    patient.recordId.IMC[i].value < 24.99 ? (
                      <p className="label has-text-success">
                        IMC: {patient.recordId.IMC[i].value}
                      </p>
                    ) : (
                      <p className="label has-text-danger">
                        IMC: {patient.recordId.IMC[i].value}
                      </p>
                    )}
                  </div>

                  <div className="column">
                    {patient.recordId.bloodPressure[i].Systolic < 120 &&
                    patient.recordId.bloodPressure[i].Systolic > 80 ? (
                      <p className="has-text-success">
                        Systolic {patient.recordId.bloodPressure[i].Systolic}{" "}
                        mmHg
                      </p>
                    ) : (
                      <p className="has-text-danger">
                        Systolic {patient.recordId.bloodPressure[i].Systolic}{" "}
                        mmHg
                      </p>
                    )}
                    {patient.recordId.bloodPressure[i].Diastolic < 80 &&
                    patient.recordId.bloodPressure[i].Diastolic > 60 ? (
                      <p className="has-text-success">
                        Diastolic {patient.recordId.bloodPressure[i].Diastolic}{" "}
                        mmHg
                      </p>
                    ) : (
                      <p className="has-text-danger">
                        Diastolic {patient.recordId.bloodPressure[i].Diastolic}{" "}
                        mmHg
                      </p>
                    )}
                  </div>
                </div>

                <p className="label">Requested Test:</p>
                {visit.medicalTest.length === 0 ? (
                  <p className="help">No test requested</p>
                ) : (
                  visit.medicalTest.map((test, i) => (
                    <p className="is-marginless is-paddingless" key={test + i}>
                      {" "}
                      {test}
                    </p>
                  ))
                )}

                <p className="label">Test Results:</p>
                <p className="is-marginless is-paddingless">
                  {visit.testResults}
                </p>

                <p className="label">Notes:</p>
                <p className="is-marginless is-paddingless">{visit.notes}</p>

                <p className="label">Recomendations: </p>
                <p className="is-marginless is-paddingless">{visit.notesOut}</p>
              </div>
            </div>
          ))}
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
