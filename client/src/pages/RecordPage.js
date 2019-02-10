import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, exitPatient } from "../lib/redux/actions";
import { Loader } from "../components/Loader";
import { RecordBackground } from "../components/RecordBackground";
import { RecordPregnancy } from "../components/RecordPregnancy";
import { RecordAppointments } from "../components/RecordAppointments";
import { RecordInformation } from "../components/RecordInformation";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import "../lib/accordion-styles.css";

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
            <section className="hero">
              <div className="hero-body">
                <h1 className="title">
                  {patient.name} {patient.surname}
                </h1>
              </div>
            </section>

            <Accordion>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    Information
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <RecordInformation />
                </AccordionItemBody>
              </AccordionItem >
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    Background
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <RecordBackground />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem expanded="true">
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    Pregnancies
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <RecordPregnancy />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    Appointments
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <RecordAppointments />
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
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
