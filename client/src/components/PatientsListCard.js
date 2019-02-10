import React from "react";
import { NavLink } from "react-router-dom";
import PatientsApi from "../lib/APIs/patientsApi";

export const PatientsListCard = ({ patient }) => {
  return (
    <div className="section patientCard">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  className="is-rounded"
                  src={patient.image}
                  alt="patient"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-6">
                {patient.name} {patient.surname}
              </p>
              <p className="subtitle is-7">{patient.role}</p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <NavLink to={`/admin/patients/record/${patient._id}`} className="card-footer-item">
            Record
            <span className="icon">
              <i className="fas fa-file-alt" aria-hidden="true" />
            </span>
          </NavLink>
          <NavLink to={`/admin/patients/edit/${patient._id}`} className="card-footer-item">
            Edit
            <span className="icon">
              <i className="fas fa-user-edit" aria-hidden="true" />
            </span>
          </NavLink>
          <span onClick={()=>PatientsApi.deletePatient(patient._id)} className="card-footer-item is-danger">
            Delete
            <span className="icon is-danger">
              <i className="fas fa-user-times" aria-hidden="true" />
            </span>
          </span>
        </footer>
      </div>
    </div>
  );
};
