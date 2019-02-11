import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";

class _PregnancyDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      pregnancy: null
    };
  }

  componentWillMount() {
    let { id } = this.props;

    PatientsApi.getPregnancy(id).then(res => {
      let { pregnancy } = res.data;
      console.log(pregnancy);
      this.setState({ pregnancy: pregnancy });
    });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    this.setState({ pregnancy: null });
  }

  render() {
    let { pregnancy } = this.state;
    let { patient } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        {pregnancy && patient ? (
          <React.Fragment>
            <div className="section">
              <p className="label" />
              <div className="field-wrapper section">
                <div className="columns has-text-centered">
                  <div className="column">
                    <p className="label">LMP</p>
                    <p className="">
                      {moment(pregnancy.LMP).format("Do MMM YY")}
                    </p>
                  </div>
                  <div className="column">
                    <p className="label">EDC</p>
                    <p className="">
                      {moment(pregnancy.EDC).format("Do MMM YY")}
                    </p>
                  </div>
                  <div className="column">
                    <p className="label">Weeks</p>
                    <p className="">{moment().diff(pregnancy.LMP, "weeks")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <p className="label" />
              <div className="field-wrapper section">
                <div className="columns">
                  <div className="column">
                    <p className="label">Mother Age</p>
                    <p className="">
                      {moment().diff(patient.bornDate, "years")} years
                    </p>

                    <p className="label">Father Age</p>
                    <p className="">
                      {moment().diff(pregnancy.partnerBirthDate, "years")} years
                    </p>
                  </div>
                  <div className="column">
                    <p className="label">Pregnancy Type</p>
                    <p className="">{pregnancy.pregnancyType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <p className="label" />
              <div className="field-wrapper section">
                <div className="columns">
                  <div className="column">
                    <p className="label">Diet</p>
                    <p className="">{pregnancy.diet}</p>
                    {pregnancy.diet === "Other" ? (
                      <p className="label">
                        Other: <p>{pregnancy.dietOther}</p>
                      </p>
                    ) : null}
                  </div>
                  <div className="column">
                    <p className="label">Diet Suplements</p>

                    <ul>
                      {pregnancy.dietSuplements.map(supl => (
                        <li>{supl}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="field-wrapper section">
                <p className="label">
                  Sports <p>{pregnancy.sport}</p>
                </p>
              </div>
            </div>

            <div className="section">
              <p className="label" />
              <div className="field-wrapper section">
                <div className="columns">
                  <div className="column">
                    <p className="label">Profession</p>
                    <p className="">{patient.profession}</p>
                  </div>
                  <div className="column">
                    <p className="label">Work Risk</p>
                    <ul>
                      {pregnancy.workRisk.map(risk => (
                        <li>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <p className="label" />
              <div className="field-wrapper section">
                <div className="columns">
                  <div className="column">
                    <p className="label">Pregnancy Risk</p>
                    <p className="">{pregnancy.risk}</p>
                    <p className="">{pregnancy.riskReason}</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <p>Loading</p>
        )}
      </React.Fragment>
    );
  }
}

export const PregnancyDetail = withRouter(
  connect(store => ({ patient: store.patient }))(_PregnancyDetail)
);
