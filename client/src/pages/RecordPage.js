import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, exitPatient } from "../lib/redux/actions";
import { Loader } from "../components/Loader";
import { RecordBackground } from "../components/RecordBackground";
import { RecordPregnancy } from "../components/RecordPregnancy";

import { RecordInformation } from "../components/RecordInformation";

import { ModalCard } from "../components/ModalCard";
import { RecordBackgroundForm } from "../components/RecordBackgroundForm";
import { PregnancyForm } from "../components/RecordPregnancyForm";
import { InformationForm } from "../components/InformationForm";

import "bulma-timeline";

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
                  <h3 className="label">Pregnancies</h3>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <ModalCard title="Add Pregnancy" button="Add Pregnancy">
                    <PregnancyForm />
                  </ModalCard>
                </div>
              </div>
            </div>
            <RecordPregnancy />

            <div className="section">
              <div class="timeline">
                <header class="timeline-header">
                  <span class="tag is-medium is-primary">Start</span>
                </header>
                <div class="timeline-item">
                  <div class="timeline-marker" />
                  <div class="timeline-content">
                    <p class="heading">January 2016</p>
                    <p>Timeline content - Can include any HTML element</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker is-image is-32x32">
                    <img src="http://bulma.io/images/placeholders/32x32.png" />
                  </div>
                  <div class="timeline-content">
                    <p class="heading">February 2016</p>
                    <p>Timeline content - Can include any HTML element</p>
                  </div>
                </div>
                <header class="timeline-header">
                  <span class="tag is-primary">2017</span>
                </header>
                <div class="timeline-item">
                  <div class="timeline-marker is-icon">
                    <i class="fa fa-flag" />
                  </div>
                  <div class="timeline-content">
                    <p class="heading">March 2017</p>
                    <p>Timeline content - Can include any HTML element</p>
                  </div>
                </div>
                <div class="timeline-header">
                  <span class="tag is-medium is-primary">End</span>
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

export const RecordPage = withRouter(
  connect(store => ({ patient: store.patient }))(_RecordPage)
);
