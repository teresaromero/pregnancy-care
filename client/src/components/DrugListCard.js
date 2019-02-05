import React from "react";
import { NavLink } from "react-router-dom";
import cx from 'classnames'

export const DrugListCard = ({ drug }) => {
let prescriptionClass=cx("icon is-large",{"has-text-danger":drug.receta})
let drivingClass=cx("icon is-large",{"has-text-danger":drug.conduc})
let blackTriangleClass=cx("icon is-large",{"has-text-danger":drug.triangulo})
  return (
    <div className="section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {drug.formaFarmaceuticaSimplificada.nombre}
          </p>
          <span className="card-header-icon" aria-label="more options">
            <span className={prescriptionClass}>
              <i className="fas fa-user-md" aria-hidden="true" />
            </span>
          </span>
          <span className="card-header-icon" aria-label="more options">
            <span className={drivingClass}>
              <i className="fas fa-car-crash" aria-hidden="true" />
            </span>
          </span>
          <span className="card-header-icon" aria-label="more options">
            <span className={blackTriangleClass}>
              <i className="fas fa-caret-down" aria-hidden="true" />
            </span>
          </span>
        </header>
        <div className="card-content">
          <div className="content">
            <p className="is-size-6">{drug.nombre}</p>
            <p className="is-size-7">Owner Lab: {drug.labtitular}</p>
          </div>
        </div>
        <footer className="card-footer">
          <NavLink to=""className="card-footer-item">
            <span className="icon">
              <i className="fas fa-info-circle" aria-hidden="true" />
            </span>
            Get more information
          </NavLink>
        </footer>
      </div>
    </div>
  );
};
