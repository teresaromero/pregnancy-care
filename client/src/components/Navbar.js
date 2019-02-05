import React from "react";
import cx from "classnames";
import { withRouter, NavLink } from "react-router-dom";
import authApi from "../lib/authApi";
import { connect } from "react-redux";
import { logout } from "../lib/redux/actions";

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
      history.push("/logout");
    });
  }

  render() {
    let { isActive } = this.state;
    const burgerClass = cx("navbar-burger burger", { "is-active": isActive });
    const menuClass = cx("navbar-menu", { "is-active": isActive });
    let { user } = this.props;
    return (
      <React.Fragment>
        <nav
        id="top-nav"
          className="navbar is-primary is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <NavLink to="/">
                <h1 className="title has-text-centered has-text-white-bis">
                  Pregnancy Care
                </h1>
              </NavLink>
            </div>
            {user ? (
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
            ) : null}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export const Navbar = connect(store => ({ user: store.user }))(
  withRouter(_Navbar)
);
