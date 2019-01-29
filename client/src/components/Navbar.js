import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./Button";
import { NavbarSide } from "./NavbarSide";

export const Navbar = ({ location }) => {
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <p className="title">Pregnancy Care</p>
        </NavLink>
        <div className="navbar-burger burger" data-target="menuBurger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div id="menuBurger" className="navbar-menu">
        <NavbarSide side="end">
          <Button btnType="is-info" iconFa="fa-sign-in-alt">
            <NavLink to={{ pathname: "/login", state: { from: location } }}>
              Login
            </NavLink>
          </Button>

          <Button btnType="is-success" iconFa="fa-user-plus">
            <NavLink to={{ pathname: "/signup", state: { from: location } }}>
              Signup
            </NavLink>
          </Button>
        </NavbarSide>
      </div>
    </nav>
  );
};
