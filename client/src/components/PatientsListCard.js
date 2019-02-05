import React from "react";
import { NavLink } from "react-router-dom";

export const PatientsListCard = ({ patient }) => {
  return (
    <div className="section patientCard">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  className="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="patient"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">
                {patient.name} {patient.surname}
              </p>
              <p class="subtitle is-7">{patient.role}</p>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <NavLink to="" class="card-footer-item">
            Record
            <span className="icon">
              <i class="fas fa-file-alt" aria-hidden="true" />
            </span>
          </NavLink>
          <NavLink to="" class="card-footer-item">
            Edit
            <span className="icon">
              <i class="fas fa-user-edit" aria-hidden="true" />
            </span>
          </NavLink>
          <NavLink to="" class="card-footer-item is-danger">
            Delete
            <span className="icon is-danger">
              <i class="fas fa-user-times" aria-hidden="true" />
            </span>
          </NavLink>
        </footer>
      </div>
    </div>
  );
};
