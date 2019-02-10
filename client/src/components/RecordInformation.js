import React from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./Loader";
import { ModalCard } from "./ModalCard";
import { RecordInformationForm } from "./RecordInformationForm";

class _RecordInformation extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  openModal() {
    this.setState({ edit: true });
  }

  closeModal() {
    this.setState({ edit: false });
  }
  render() {
    let { patient } = this.props;
    let { edit } = this.state;
    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <button
              className="button is-rounded"
              onClick={() => this.openModal()}
            >
              <span className="icon is-small">
                <i className="fas fa-edit" />
              </span>
            </button>
            <ModalCard
              title="Edit Information"
              isActive={edit}
              handleClose={() => this.closeModal()}
            >
              <RecordInformationForm
                handleClose={() => this.closeModal()}
                handleSave={record => this.saveUpdate(record)}
              />
            </ModalCard>
            <div className="section">
              <div className="columns">
                <div className="column">
                  <p className="heading">Name and surname</p>
                  <p className="is-6">
                    {patient.name} {patient.surname}
                  </p>
                </div>
                <div className="column">
                  <p className="heading">ID</p>
                  <p className="is-6">{patient.idNum}</p>
                </div>
                <div className="column">
                  <p className="heading">Born Date</p>
                  <p className="is-6">
                    {moment(patient.bornDate).format("Do MMM YY")} (
                    {moment().diff(patient.bornDate, "years")} years)
                  </p>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <p className="heading">Address</p>
                  <p className="is-6  is-marginless">
                    {patient.address.street}
                  </p>
                  <p className="is-6  is-marginless">
                    {patient.address.number}
                  </p>
                  <p className="is-6  is-marginless">{patient.address.city}</p>
                  <p className="is-6  is-marginless">{patient.address.state}</p>
                  <p className="is-6  is-marginless">{patient.address.zip}</p>
                </div>
                <div className="column">
                  <p className="heading">Phone</p>
                  <p className="is-6">{patient.phone}</p>
                </div>
                <div className="column">
                  <p className="heading">Email</p>
                  <p className="is-6">{patient.email}</p>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <p className="heading">Insurance Company</p>
                  <p className="is-6  is-marginless">{patient.insurance}</p>
                  <p className="is-6  is-marginless">
                    Policy Nª{patient.insNumber}
                  </p>
                </div>
                <div className="column">
                  <p className="heading">Profession</p>
                  <p className="is-6 is-paddingless is-marginless">
                    {patient.profession}
                  </p>
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

export const RecordInformation = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordInformation)
);
