import React from "react";
import cx from "classnames";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

const _UserBadge = ({ user }) => {
  const userTagClass = cx({
    tag: true,
    "is-success": user.isActive,
    "is-warning tooltip is-tooltip-bottom": !user.isActive
  });
  return (
    <span
      className={userTagClass}
      data-tooltip="Activate your account with the email we sent! 📩"
    >
      {user.isActive ? <span>Active Acount</span> : <span>Not Active</span>}
    </span>
  );
};

export const UserBadge = connect(state => ({ user: state.user }))(
  withRouter(_UserBadge)
);
