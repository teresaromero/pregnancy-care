import React from "react";
import { NavLink } from "react-router-dom";

export const Aside = () => {
  return (
    <React.Fragment>
      <aside className="menu column section is-one-quarter is-narrow-mobile is-fullheight section is-hidden-mobile has-background-white">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <p className="subtitl">Admin information</p>
            </div>
          </div>
        </div>

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard" activeClassName="is-active">
              <span class="icon">
                <i class="fas fa-home" />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-users" />
              </span><span>Patients</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Agenda</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/overview" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-calendar-alt"/>
              </span><span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-appointment" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-calendar-plus"/>
              </span><span>New Appointment</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Data</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/vademecum" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-search"/>
              </span><span>Vademecum</span> 
            </NavLink>
          </li>
          <li>
            <NavLink to="/research" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-book-medical"/>
              </span><span>Medical Research</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/profile" activeClassName="is-active">
            <span class="icon">
                <i class="fas fa-cog"/>
              </span><span>My Account</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};
