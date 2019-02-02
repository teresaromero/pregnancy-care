import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserCard } from "./UserCard";

const _Aside = ({user}) => {
  return (
    <React.Fragment>
      <aside className="menu column is-one-quarter is-narrow is-fullheight container is-hidden-mobile">
        <UserCard/>

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard" activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-home" />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" activeClassName="is-active">
              <span className="icon">
                <i className="fas fa-users" />
              </span>
              <span>Patients</span>
            </NavLink>
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
            <NavLink to="/vademecum" activeClassName="is-active">
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
            <NavLink to="/profile" activeClassName="is-active">
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

export const Aside = connect(state => ({ user: state.user }))(
  withRouter(_Aside)
);
