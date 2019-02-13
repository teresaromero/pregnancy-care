import React from "react";
import { NavLink } from "react-router-dom";

export const PatientsListCard = ({ patient }) => {
  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-48x48">
            <img className="is-rounded" src={patient.image} alt="patient" />
          </figure>
        </div>
        <div className="level-item">
          <p className="label">
            {patient.name} {patient.surname}
          </p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <NavLink to={`/admin/patients/record/${patient._id}`}>
            <span class="icon has-text-primary">
              <i class="fas fa-lg	fa-file-medical-alt" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
