import React from "react";
import cx from "classnames";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

const _ProfileView = ({ user }) => {
  return (
    <div className="section">
      <div class="columns is-mobile is-centered has-text-centered	">
        <div class="column is-half">
          <div className="section">
            
          </div>
          <p>
            {user.name} {user.surname}
          </p>
          <p>{user.email}</p>
          <p>User since {user.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export const ProfileView = connect(state => ({ user: state.user }))(
  withRouter(_ProfileView)
);
