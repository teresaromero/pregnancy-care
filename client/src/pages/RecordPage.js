import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

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

  render() {
    let { patient } = this.props;
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

            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="label">Information</h3>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <ModalCard button="edit" title="Edit Information">
                    <InformationForm />
                  </ModalCard>
                </div>
              </div>
            </div>

            <RecordInformation />

            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="label">Background</h3>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <ModalCard button="edit" title="Edit Information">
                    <RecordBackgroundForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <RecordBackground />

            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="label">Pregnancy</h3>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <ModalCard title={`Edit`} button="Edit">
                    <RecordPregnancyForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <PregnancyDetail />

            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="label">Visits</h3>
                </div>
              </div>
              <div className="level-right">
              </div>
            </div>
            <Timeline />
            <VisitForm/>
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
