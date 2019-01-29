import React from "react";

export const NavbarSide = ({ side, children }) => {
  return (
    <div className={"navbar-" + side}>
      <div className="navbar-item">
        <div className="field is-grouped">{children}</div>
      </div>
    </div>
  );
};
