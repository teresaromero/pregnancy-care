import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const _FooterNav = () => {
  return (
    <nav
      className="navbar is-fixed-bottom is-primary"
      id="footer-nav"
      role="navigation"
      aria-label="footer navigation"
    >
      <div id="footer-content" className="navbar-brand">
        <NavLink
          to={`/`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg	 fa-home" />
          </span>
        </NavLink>
        <NavLink
          to={`/patients/add`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg	 fa-user-plus" />
          </span>
        </NavLink>
        <NavLink
          to={`/calendar`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon is-large">
            <i className="fas fa-lg fa-user-clock" />
          </span>
        </NavLink>
        <NavLink
          to={`/vademecum`}
          activeClassName="is-active"
          className="navbar-item"
        >
          <span className="icon">
            <i className="fas fa-lg	 fa-pills" />
          </span>
        </NavLink>
        <NavLink
          to={`/profile`}
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
