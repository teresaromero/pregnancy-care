import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ModalCard } from "./ModalCard";
import { PregnancyForm } from "./RecordPregnancyForm";

class _RecordPregnancy extends React.Component {
  constructor() {
    super();
    this.state = {
      addModal: false,
      edit: false
    };
  }

  openModal(modal) {
    if (modal === "add") {
      this.setState({ addModal: true });
    }
    this.setState({ edit: true });
  }

  closeModal() {
    this.setState({ edit: false, addModal: false });
  }

  render() {
    let { patient } = this.props;
    let { addModal } = this.state;
    let { pregnanciesId } = patient.recordId;

    return (
      <React.Fragment>
        <button className="button" onClick={() => this.openModal("add")}>
          <span className="icon is-small">
            <i className="fas fa-plus-square" />
          </span>
        </button>
        <ModalCard
          title="New Pregnancy"
          isActive={addModal}
          id="add"
          handleClose={() => this.closeModal()}
        >
          <PregnancyForm />
        </ModalCard>
        {pregnanciesId.length !== 0 ? (
          <React.Fragment>
            <button
              className="button is-rounded"
              onClick={() => this.openModal("add")}
            >
              <span className="icon is-small">
                <i className="fas fa-edit" />
              </span>
            </button>
            {/* <ModalCard
              title="Edit Background"
              isActive={edit}
              handleClose={() => this.closeModal()}
            >
              <RecordBackgroundForm
                handleClose={() => this.closeModal()}
                handleSave={record => this.saveUpdate(record)}
              />
            </ModalCard> */}

            {pregnanciesId.map((pId, i) => (
              <p key={pId}>Pregnancy {i + 1}</p>
            ))}

            {/* <React.Fragment>

                <div className="section">
                  <p className="label" />
                  <div className="field-wrapper section">
                    <div className="columns has-text-centered">
                      <div className="column">
                        <p className="label">LMP</p>
                        <p className="">
                          {moment(pregnancyRecord.LMP).format("Do MMM YY")}
                        </p>
                      </div>
                      <div className="column">
                        <p className="label">EDC</p>
                        <p className="">
                          {moment(pregnancyRecord.EDC).format("Do MMM YY")}
                        </p>
                      </div>
                      <div className="column">
                        <p className="label">Weeks</p>
                        <p className="">
                          {moment().diff(pregnancyRecord.LMP, "weeks")}
                        </p>
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
                          {moment().diff(
                            pregnancyRecord.partnerBirthDate,
                            "years"
                          )}{" "}
                          years
                        </p>
                      </div>
                      <div className="column">
                        <p className="label">Pregnancy Type</p>
                        <p className="">{pregnancyRecord.pregnancyType}</p>
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
                        <p className="">{pregnancyRecord.diet}</p>
                        {pregnancyRecord.diet === "Other" ? (
                          <p className="label">
                            Other: <p>{pregnancyRecord.dietOther}</p>
                          </p>
                        ) : null}
                      </div>
                      <div className="column">
                        <p className="label">Diet Suplements</p>

                        <ul>
                          {pregnancyRecord.dietSuplements.map(supl => (
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
                      Sports <p>{pregnancyRecord.sport}</p>
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
                          {pregnancyRecord.workRisk.map(risk => (
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
                        <p className="">{pregnancyRecord.risk}</p>
                        <p className="">{pregnancyRecord.riskReason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment> */}
          </React.Fragment>
        ) : (
          <p>No pregnancies in your record</p>
        )}
      </React.Fragment>
    );
  }
}

export const RecordPregnancy = withRouter(
  connect(store => ({ patient: store.patient, user: store.user }))(
    _RecordPregnancy
  )
);
