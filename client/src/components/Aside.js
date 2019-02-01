import React from "react";
import { NavLink } from "react-router-dom";

export const Aside = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
