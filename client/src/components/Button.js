import React from "react";

export const Button = ({ btnType, iconFa, children }) => {
  return (
    <p className="control">
      <button className={"button " + btnType}>
        <span className="icon is-small">
          <i className={"fas " + iconFa} />
        </span>
        <span>{children}</span>
      </button>
    </p>
  );
};
