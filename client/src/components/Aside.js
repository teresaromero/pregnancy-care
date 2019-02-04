import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserCard } from "./UserCard";

const _Aside = ({ path }) => {
  return (
    <React.Fragment>
      <aside className="menu column is-one-quarter is-narrow is-fullheight container is-hidden-mobile">
        <UserCard />

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`${path}`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-home" />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`${path}/patients`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-users" />
              </span>
              <span>Patients</span>
            </NavLink>
            <ul>
              <li>
                <NavLink
                  to={`${path}/patients/add`}
                  activeClassName="is-active"
                >
                  <span>Add Patient</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/patients/advancedSearch`}
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
            <NavLink to="/overview" activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-calendar-alt" />
              </span>
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-appointment" activeClassName="is-active">
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
            <NavLink to={`${path}/vademecum`} activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-search" />
              </span>
              <span>Vademecum</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/research" activeClassName="is-active">
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
            <NavLink to={`${path}/profile`} activeClassName="is-active">
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
