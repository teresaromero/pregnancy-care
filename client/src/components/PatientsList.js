import React from "react";

import { PatientsListCard } from "./PatientsListCard.js";

import { withRouter,NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { SearchBarPatients } from "./SearchBarPatients.js";

const _PatientsList = ({ allPatients, filtered }) => {
  return (
    <React.Fragment>
      <div className="columns is-vcentered has-text-centered	">
        <div className="column">
          <SearchBarPatients />
        </div>
        <div className="column is-one-fifth">
          <NavLink to="/admin/patients/add" className="button is-large is-primary is-outlined">
            <span className="icon is-large">
              <i className="fas fa-lg fa-user-plus" />
            </span>
          </NavLink>
        </div>
      </div>

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
