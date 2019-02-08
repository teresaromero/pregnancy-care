import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { viewPatient, exitPatient } from "../lib/redux/actions";
import { Loader } from "../components/Loader";
import { RecordPreconceptional } from "../components/RecordPreconceptional";
import { RecordPregnancy } from "../components/RecordPregnancy";
import { RecordAppointments } from "../components/RecordAppointments";
import { RecordInformation } from "../components/RecordInformation";

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
            <div className="section">
              <RecordInformation />
              <RecordPreconceptional />
              <RecordPregnancy />
              <RecordAppointments />
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
