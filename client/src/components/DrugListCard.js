import React from "react";
import { NavLink } from "react-router-dom";
import cx from 'classnames'

export const DrugListCard = ({ drug }) => {
let prescriptionClass=cx("icon is-large",{"has-text-danger":drug.receta})
let drivingClass=cx("icon is-large",{"has-text-danger":drug.conduc})
let blackTriangleClass=cx("icon is-large",{"has-text-danger":drug.triangulo})
  return (
    <div className="section">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {drug.formaFarmaceuticaSimplificada.nombre}
          </p>
          <span class="card-header-icon" aria-label="more options">
            <span class={prescriptionClass}>
              <i class="fas fa-user-md" aria-hidden="true" />
            </span>
          </span>
          <span class="card-header-icon" aria-label="more options">
            <span class={drivingClass}>
              <i class="fas fa-car-crash" aria-hidden="true" />
            </span>
          </span>
          <span class="card-header-icon" aria-label="more options">
            <span class={blackTriangleClass}>
              <i class="fas fa-caret-down" aria-hidden="true" />
            </span>
          </span>
        </header>
        <div class="card-content">
          <div class="content">
            <p className="is-size-6">{drug.nombre}</p>
            <p className="is-size-7">Owner Lab: {drug.labtitular}</p>
          </div>
        </div>
        <footer class="card-footer">
          <NavLink to=""class="card-footer-item">
            <span className="icon">
              <i class="fas fa-info-circle" aria-hidden="true" />
            </span>
            Get more information
          </NavLink>
        </footer>
      </div>
    </div>
  );
};
