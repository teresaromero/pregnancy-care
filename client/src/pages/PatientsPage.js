import React from "react";
import { PatientsList } from "../components/PatientsList";
import { SearchBarPatients } from "../components/SearchBarPatients";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const _PatientsPage = () => {
  return (
    <div className="section">
      <div className="columns is-vcentered is-marginless has-text-centered">
        
        <div className="column">
          <SearchBarPatients />
        </div>

        <div className="column is-one-fifth">
          <NavLink
            to="/admin/patients/add"
            className="button is-large is-primary is-outlined"
          >
            <span className="icon is-large">
              <i className="fas fa-lg fa-user-plus" />
            </span>
          </NavLink>
        </div>

      </div>
      <PatientsList />
    </div>
  );
};

export const PatientsPage = withRouter(connect()(_PatientsPage));
