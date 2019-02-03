import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import authApi from "../lib/authApi";
import { connect } from "react-redux";
import { logout } from "../lib/redux/actions";
import { withRouter } from "react-router-dom";


class _Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }
  handleLogout() {
    let { dispatch, history } = this.props;
    authApi.logout().then(() => {
      dispatch(logout());
      history.push("/");
    });
  }

  render() {
    let { isActive } = this.state;
    const burgerClass = cx("navbar-burger burger", { "is-active": isActive });
    const menuClass = cx("navbar-menu", { "is-active": isActive });
    
    return (
      <React.Fragment>
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="title has-text-centered has-text-white-bis">
                Pregnancy Care
              </h1>
            </div>

            <div className="navbar-item">
              <span className="icon is-medium">
                <i className="fas fa-lg fa-bell" />
              </span>
            </div>
            <div className="navbar-item">
              <span className="icon is-medium">
                <i className="fas fa-lg fa-user-plus" />
              </span>
            </div>
            <a
              className={burgerClass}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-menu"
              onClick={() => this.setState({ isActive: !isActive })}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div className={menuClass}>
            <div className="navbar-start">
              <ul className="menu-list is-hidden-tablet">
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
                <li>
                  <NavLink to="/overview" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-calendar-alt" />
                    </span>
                    <span>Agenda</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <button
                  className="button is-danger"
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-power-off" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export const Navbar = connect(store => ({ user: store.user }))(
  withRouter(_Navbar)
);
