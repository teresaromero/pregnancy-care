import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserCard } from "./UserCard";

const _Aside = ({match}) => {
  return (
    <React.Fragment>
      <aside className="menu">
        <UserCard />
        <hr class="navbar-divider"/>
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`${match.url}`}>
              <span className="icon">
                <i className="fas fa-home" />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/patients`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-users" />
              </span>
              <span>Patients</span>
            </NavLink>
            <ul>
              <li>
                <NavLink
                  to={`${match.url}/patients/add`}
                  activeClassName="is-active"
                >
                  <span>Add Patient</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${match.url}/patients/advancedSearch`}
                  activeClassName="is-active"
                >
                  <span>Advanced Search</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <p className="menu-label">Agenda</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`${match.url}/overview`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-calendar-alt" />
              </span>
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/new-appointment`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-calendar-plus" />
              </span>
              <span>New Appointment</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Data</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`${match.url}/vademecum`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-search" />
              </span>
              <span>Vademecum</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/research`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-book-medical" />
              </span>
              <span>Medical Research</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`${match.url}/profile`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-cog" />
              </span>
              <span>My Account</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export const Aside = withRouter(
  connect(store => ({ user: store.user }))(_Aside)
);
