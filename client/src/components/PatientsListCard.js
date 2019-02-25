import React from "react";
import { NavLink } from "react-router-dom";

export const PatientsListCard = ({ name, surname, id, image }) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-48x48">
            <img className="is-rounded" src={image} alt="patient" />
          </figure>
        </div>
        <div className="level-item">
          <p className="label">
            {name} {surname}
          </p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <NavLink to={`/admin/patients/record/${id}`}>
            <span className="icon has-text-primary">
              <i className="fas fa-lg	fa-file-medical-alt" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
