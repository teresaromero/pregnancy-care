import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Aside } from "./Aside";

export const Dashboard = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns is-fullheight">
        <Aside />
        <div className="column section">{children}</div>
      </div>
    </React.Fragment>
  );
};
