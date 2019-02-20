import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  viewPatient,
  exitPatient,
  openModalInfo,
  openModalBack,
  openModalPregn,
  openModalVisit,
  closeModal
} from "../lib/redux/actions";
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
    let { dispatch } = this.props;
    if (id === "info") {
      dispatch(openModalInfo());
    } else if (id === "back") {
      dispatch(openModalBack());
    } else if (id === "pregnancy") {
      dispatch(openModalPregn());
    } else if (id === "visit") {
      dispatch(openModalVisit());
    }
  }

  closeModal() {
    let { dispatch } = this.props;
    dispatch(closeModal());
  }

  render() {
    let { patient, modalBack, modalInfo, modalPregn, modalVisit } = this.props;
    let {
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
                    isActive={modalPregn}
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
  connect(store => ({
    patient: store.patient,
    modalBack: store.modalBack,
    modalInfo: store.modalInfo,
    modalPregn: store.modalPregn,
    modalVisit: store.modalVisit
  }))(_RecordPage)
);
