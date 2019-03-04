import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";

class _PregnancyDetail extends React.Component {
  render() {
    let { patient } = this.props;
    let patientRecord = this.props.patient.recordId;
    return (
      <React.Fragment>
        {patient && patientRecord ? (
          <React.Fragment>
            <div className="field-wrapper">
              <div className="columns has-text-centered is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-half-mobile">
                  <p className="label">LMP</p>
                  <p className="">
                    {moment(patientRecord.LMP).format("Do MMM YY")}
                  </p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">EDC</p>
                  <p className="">
                    {moment(patientRecord.EDC).format("Do MMM YY")}
                  </p>
                </div>
                <div className="column is-full-mobile">
                  <p className="label">Weeks</p>
                  <p className="">
                    {moment().diff(patientRecord.LMP, "weeks")}
                  </p>
                </div>
              </div>
            </div>

            <p className="label" />
            <div className="field-wrapper">
              <div className="columns is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-half-mobile">
                  <p className="label">Mother Age</p>
                  <p className="">
                    {moment().diff(patient.bornDate, "years")} years
                  </p>

                  <p className="label">Father Age</p>
                  <p className="">
                    {moment().diff(patientRecord.partnerBirthDate, "years")}{" "}
                    years
                  </p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Pregnancy Type</p>
                  <p className="">{patientRecord.pregnancyType}</p>
                </div>
              </div>
            </div>

            <p className="label" />
            <div className="field-wrapper">
              <div className="columns is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-half-mobile">
                  <p className="label">Diet</p>
                  <p className="">{patientRecord.diet}</p>
                  {patient.diet === "Other" ? (
                    <p className="label">
                      Other: <p>{patientRecord.dietOther}</p>
                    </p>
                  ) : null}
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Diet Suplements</p>

                  <ul>
                    {patientRecord.dietSuplements.map(supl => (
                      <li key={supl}>{supl}</li>
                    ))}
                  </ul>
                </div>
                <div className="column is-full-mobile">
                  <p className="label">Sports </p>
                  <p>{patientRecord.sport}</p>
                </div>
              </div>
            </div>

            <div className="field-wrapper">
              <div className="columns is-marginless is-paddingless is-mobile is-multiline">
                <div className="column is-half-mobile">
                  <p className="label">Profession</p>
                  <p className="">{patient.profession}</p>
                </div>
                <div className="column is-half-mobile">
                  <p className="label">Work Risk</p>
                  <ul>
                    {patientRecord.workRisk.map(risk => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </div>
                <div className="column is-full-mobile">
                  <p className="label">Pregnancy Risk</p>
                  <p className="">{patientRecord.risk}</p>
                  <p className="">{patientRecord.riskReason}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const PregnancyDetail = withRouter(
  connect(store => ({ patient: store.patient }))(_PregnancyDetail)
);
