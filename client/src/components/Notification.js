import React from "react";

export const Notification = ({ children, type }) => {
  return (
    <div className={`notification ${type}`}>
      <button className="delete" />
      {children}
    </div>
  );
};
