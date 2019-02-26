import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserCard } from "./UserCard";

const _Aside = ({ match }) => {
  return (
    <React.Fragment>
      <aside className="menu">
        <div className="box">
          <UserCard />
        </div>
        <div className="box">
          <ul className="menu-list">
            <li>
              <NavLink to={`${match.url}`}>
                <span className="icon is-medium">
                  <i className="fas fa-lg fa-home" />
                </span>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={`${match.url}/patients`} activeClassName="is-active">
                <span className="icon is-medium">
                  <i className="fas fa-lg fa-female" />
                </span>
                <span>Patients</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={`${match.url}/agenda`} activeClassName="is-active">
                <span className="icon is-medium">
                  <i className="fas fa-lg fa-calendar-alt" />
                </span>
                <span>Agenda</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`${match.url}/vademecum`}
                activeClassName="is-active"
              >
                <span className="icon is-medium">
                  <i className="fas fa-lg fa-search" />
                </span>
                <span>Vademecum</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={`${match.url}/profile`} activeClassName="is-active">
                <span className="icon is-medium">
                  <i className="fas fa-lg fa-cog" />
                </span>
                <span>My Account</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};

export const Aside = withRouter(
  connect(store => ({ user: store.user }))(_Aside)
);
