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
      data-tooltip="Activate your account! 📩"
    >
      {user.isActive ? <span>Active</span> : <span>Not Active</span>}
    </span>
  );
};

export const UserBadge = withRouter(connect(store => ({ user: store.user }))(_UserBadge))

