import React from "react";

import { PatientsListCard } from "./PatientsListCard.js";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchBarPatients } from "./SearchBarPatients.js";

const _PatientsList = ({ allPatients, filtered }) => {
  return (
    <React.Fragment>
      <SearchBarPatients />

      {filtered ? (
        filtered.map(patient => (
          <div className="box">
            <PatientsListCard key={patient._id} patient={patient} />
          </div>
        ))
      ) : allPatients ? (
        allPatients.map(patient => (
          <div className="box">
            <PatientsListCard key={patient._id} patient={patient} />
          </div>
        ))
      ) : (
        <p>Loading All Patients</p>
      )}
    </React.Fragment>
  );
};

export const PatientsList = withRouter(
  connect(store => ({
    allPatients: store.patientList,
    filtered: store.filteredPatientList
  }))(_PatientsList)
);
