import React from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

const _ProfileView = ({ user }) => {
  return (
    <div className="section">
      <div class="columns is-mobile is-centered has-text-centered	">
        <div class="column is-half">
          <div className="section" />
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

export const ProfileView = connect(store => ({ user: store.user }))(
  withRouter(_ProfileView)
);
