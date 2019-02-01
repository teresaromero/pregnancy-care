import React from "react";
import {NavLink} from 'react-router-dom'

export const Dashboard = ({children}) => {
  return (
    <React.Fragment>
      <nav
        className="navbar is-info"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <p className="title">Logo</p>
          <p className="buttons">
            <button className="button is-danger is-outlined">
              <span className="icon is-small">
                <i className="fas fa-power-off" />
              </span>
            </button>
          </p>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start" />

          <div className="navbar-end">
            <div className="navbar-item" />
          </div>
        </div>
      </nav>

      <div className="container columns is-fullheight">
        <aside class="menu column section is-one-quarter is-narrow-mobile is-fullheight section is-hidden-mobile has-background-white">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/patients">Patients</NavLink>
            </li>
          </ul>
          <p class="menu-label">Agenda</p>
          <ul class="menu-list">
            <li>
              <NavLink to="/overview">Overview</NavLink>
            </li>
            <li>
              <NavLink to="/new-appointment">New Appointment</NavLink>
            </li>
          </ul>
          <p class="menu-label">Data</p>
          <ul class="menu-list">
            <li>
              <NavLink to="/vademecum">Vademecum</NavLink>
            </li>
            <li>
              <NavLink to="/research">Medical Research</NavLink>
            </li>
          </ul>
        </aside>
        <div className="column section">{children}</div>
      </div>
    </React.Fragment>
  );
};
