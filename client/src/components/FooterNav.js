import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const _FooterNav = ({match}) => {
  return (
    <nav
      className="navbar is-fixed-bottom is-primary"
      id="footer-nav"
      role="navigation"
      aria-label="footer navigation"
    >
      <div id="footer-content" className="navbar-brand">
        <NavLink
          to={`/admin`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg	 fa-home" />
          </span>
        </NavLink>
        <NavLink
          to={`/admin/patients`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg	 fa-female" />
          </span>
        </NavLink>
        <NavLink
          to={`/admin/agenda`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg fa-user-clock" />
          </span>
        </NavLink>
        <NavLink
          to={`/admin/vademecum`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon">
            <i className="fas fa-lg	 fa-pills" />
          </span>
        </NavLink>
        <NavLink
          to={`/admin/profile`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg	 fa-cog" />
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export const FooterNav = withRouter(connect()(_FooterNav));
