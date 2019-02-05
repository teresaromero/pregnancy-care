import React from "react";
import { NavLink } from "react-router-dom";

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
                  src="https://bulma.io/images/placeholders/96x96.png"
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
          <NavLink to="" className="card-footer-item">
            Record
            <span className="icon">
              <i className="fas fa-file-alt" aria-hidden="true" />
            </span>
          </NavLink>
          <NavLink to="" className="card-footer-item">
            Edit
            <span className="icon">
              <i className="fas fa-user-edit" aria-hidden="true" />
            </span>
          </NavLink>
          <NavLink to="" className="card-footer-item is-danger">
            Delete
            <span className="icon is-danger">
              <i className="fas fa-user-times" aria-hidden="true" />
            </span>
          </NavLink>
        </footer>
      </div>
    </div>
  );
};
