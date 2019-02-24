import React from "react";
import { PatientsListCard } from "./PatientsListCard.js";
import { Loader } from "./Loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const _PatientsList = ({ allPatients, filtered }) => {
  return (
    <React.Fragment>
      <div className="section">
        {filtered ? (
          filtered.map(patient => (
            <div key={patient.name} className="box">
              <PatientsListCard patient={patient} />
            </div>
          ))
        ) : allPatients ? (
          allPatients.map(patient => (
            <div key={patient.name} className="box">
              <PatientsListCard patient={patient} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </React.Fragment>
  );
};

export const PatientsList = withRouter(
  connect(store => ({
    allPatients: store.patientList,
    filtered: store.filteredPatientList
  }))(_PatientsList)
);
