import React from "react";
import { Navbar } from "./Navbar";
import { Aside } from "./Aside";

export const Dashboard = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="section">
        <div className="columns container">
          <Aside />
          <div className="column container dashContent">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
