import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

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
import  InformationForm  from "../components/InformationForm";

import { Timeline } from "../components/Timeline";
import { PregnancyDetail } from "../components/PregnancyDetail";
import { VisitForm } from "../components/VisitForm";

class _RecordPage extends React.Component {
  componentDidMount() {
    let { dispatch } = this.props;

    PatientsApi.getPatient(`${this.props.match.params.id}`).then(res => {
      let { patient } = res.data;
      dispatch(viewPatient(patient));
    });
  }

  componentWillUnmount() {
    let { dispatch } = this.props;

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

  render() {
    let {
      patient,
      modalBack,
      modalInfo,
      modalPregn,
      modalVisit,
      dispatch
    } = this.props;
    return (
      <React.Fragment>
        {patient ? (
          <React.Fragment>
            <div className="box">
              <div className="section-header has-background-primary">
                <p className="label label-heading is-marginless">Information</p>
                <div className="modal-section">
                  <button
                    className="button is-primary is-outlined is-inverted"
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
                    closeModal={() => dispatch(closeModal())}
                  >
                    <InformationForm />
                  </ModalCard>
                </div>
              </div>
              <RecordInformation />

              <div className="section-header has-background-primary">
                <p className="label label-heading is-marginless">Background</p>
                <div className="modal-section">
                  <button
                    className="button is-primary is-inverted is-outlined"
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
                    closeModal={() => dispatch(closeModal())}
                  >
                    <RecordBackgroundForm />
                  </ModalCard>
                </div>
              </div>
              <RecordBackground />

              <div className="section-header has-background-primary">
                <p className="label label-heading is-marginless">Pregnancy</p>
                <div className="modal-section">
                  <button
                    className="button is-primary is-inverted is-outlined"
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
                    closeModal={() => dispatch(closeModal())}
                  >
                    <RecordPregnancyForm />
                  </ModalCard>
                </div>
              </div>
              <PregnancyDetail />

              <div className="section-header has-background-primary">
                <p className="label label-heading is-marginless">Visits</p>
                <div className="modal-section">
                  <button
                    className="button is-primary is-inverted is-outlined"
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
                    closeModal={() => dispatch(closeModal())}
                  >
                    <VisitForm />
                  </ModalCard>
                </div>
              </div>
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
