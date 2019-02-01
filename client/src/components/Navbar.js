import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";

export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }
  render() {
    let { isActive } = this.state;
    const burgerClass = cx("navbar-burger burger",{ "is-active": isActive });
    const menuClass = cx("navbar-menu", { "is-active": isActive });
    return (
      <React.Fragment>
        <nav
          className="navbar is-info"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="title">Pregnancy Care</h1>
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
              <ul class="menu-list is-hidden-desktop">
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/patients">Patients</NavLink>
                </li>
                <li>
                  <NavLink to="/overview">Agenda</NavLink>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-danger">
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
