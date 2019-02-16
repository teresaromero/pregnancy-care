import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, exitPatient } from "../lib/redux/actions";
import { Loader } from "../components/Loader";
import { RecordBackground } from "../components/RecordBackground";

import { RecordInformation } from "../components/RecordInformation";

import { ModalCard } from "../components/ModalCard";
import { RecordBackgroundForm } from "../components/RecordBackgroundForm";
import { RecordPregnancyForm } from "../components/RecordPregnancyForm";
import { InformationForm } from "../components/InformationForm";

import "bulma-timeline";
import { Timeline } from "../components/Timeline";
import { PregnancyDetail } from "../components/PregnancyDetail";
import { VisitForm } from "../components/VisitForm";

class _RecordPage extends React.Component {
  constructor() {
    super();
    this.state = {
      modalInfo: false,
      modalBack: false,
      modalPregnancy: false,
      modalVisit: false,
      infoIsActive: true,
      backIsActive: true,
      pregIsActive: true,
      visitsIsActive: true
    };
  }
  componentDidMount() {
    let { dispatch } = this.props;
    console.log("Component did mount");
    PatientsApi.getPatient(`${this.props.match.params.id}`).then(res => {
      let { patient } = res.data;
      dispatch(viewPatient(patient));
    });
  }

  componentWillUnmount() {
    let { dispatch } = this.props;
    console.log("Component will unmount");
    dispatch(exitPatient());
  }

  openModal(id) {
    if (id === "info") {
      this.setState({ modalInfo: true });
    } else if (id === "back") {
      this.setState({ modalBack: true });
    } else if (id === "pregnancy") {
      this.setState({ modalPregnancy: true });
    } else if (id === "visit") {
      this.setState({ modalVisit: true });
    }
  }

  closeModal() {
    this.setState({
      modalInfo: false,
      modalBack: false,
      modalPregnancy: false,
      modalVisit: false
    });
  }

  render() {
    let { patient } = this.props;
    let {
      modalInfo,
      modalBack,
      modalPregnancy,
      modalVisit,
      infoIsActive,
      backIsActive,
      pregIsActive,
      visitsIsActive
    } = this.state;
    let infoClass = cx("section", { "is-hidden": infoIsActive });
    let backClass = cx("section", { "is-hidden": backIsActive });
    let pregClass = cx("section", { "is-hidden": pregIsActive });
    let visitsClass = cx("section", { "is-hidden": visitsIsActive });
    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <section className="hero box">
              <div className="hero-body">
                <h1 className="title">
                  {patient.name} {patient.surname}
                </h1>
              </div>
            </section>

            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() =>
                      this.setState({ infoIsActive: !this.state.infoIsActive })
                    }
                  >
                    <span className="icon">
                      {infoIsActive ? (
                        <i className="fas fa-folder" />
                      ) : (
                        <i className="fas fa-folder-open" />
                      )}
                    </span>
                    <span>
                      <h3 className="label">Information</h3>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() => this.openModal("info")}
                    data-target="info-modal"
                  >
                    <span className="icon">
                      <i className={`far fa-edit`} />
                    </span>
                  </button>

                  <ModalCard
                    id="info-modal"
                    isActive={modalInfo}
                    closeModal={() => this.closeModal()}
                  >
                    <InformationForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <div className={infoClass}>
              <RecordInformation />
            </div>

            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() =>
                      this.setState({ backIsActive: !this.state.backIsActive })
                    }
                  >
                    <span className="icon">
                      {backIsActive ? (
                        <i className="fas fa-folder" />
                      ) : (
                        <i className="fas fa-folder-open" />
                      )}
                    </span>
                    <span>
                      <h3 className="label">Background</h3>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() => this.openModal("back")}
                    data-target="background-modal"
                  >
                    <span className="icon">
                      <i className={`far fa-edit`} />
                    </span>
                  </button>

                  <ModalCard
                    id="background-modal"
                    isActive={modalBack}
                    closeModal={() => this.closeModal()}
                  >
                    <RecordBackgroundForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <div className={backClass}>
              <RecordBackground />
            </div>

            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() =>
                      this.setState({ pregIsActive: !this.state.pregIsActive })
                    }
                  >
                    <span className="icon">
                      {pregIsActive ? (
                        <i className="fas fa-folder" />
                      ) : (
                        <i className="fas fa-folder-open" />
                      )}
                    </span>
                    <span>
                      <h3 className="label">Pregnancy</h3>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() => this.openModal("pregnancy")}
                    data-target="pregnancy-modal"
                  >
                    <span className="icon">
                      <i className={`far fa-edit`} />
                    </span>
                  </button>

                  <ModalCard
                    id="pregnancy-modal"
                    isActive={modalPregnancy}
                    closeModal={() => this.closeModal()}
                  >
                    <RecordPregnancyForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <div className={pregClass}>
              <PregnancyDetail />
            </div>

            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() =>
                      this.setState({
                        visitsIsActive: !this.state.visitsIsActive
                      })
                    }
                  >
                    <span className="icon">
                      {visitsIsActive ? (
                        <i className="fas fa-folder" />
                      ) : (
                        <i className="fas fa-folder-open" />
                      )}
                    </span>
                    <span>
                      <h3 className="label">Visits</h3>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button
                    className="button is-primary is-inverted"
                    onClick={() => this.openModal("visit")}
                    data-target="visit-modal"
                  >
                    <span className="icon">
                      <i className={`far fa-plus-square`} />
                    </span>
                  </button>
                  <ModalCard
                    id="visit-modal"
                    isActive={modalVisit}
                    closeModal={() => this.closeModal()}
                  >
                    <VisitForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <div className={visitsClass}>
              <Timeline />
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const RecordPage = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordPage)
);
