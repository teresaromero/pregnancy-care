import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserBadge } from "./UserBadge";

const _UserCard = ({ user, match }) => {
  return (
    <React.Fragment>
      <div className="columns">
        <div className="column is-paddingless">
          <figure className="image is-64x64">
            <img className="is-rounded" src={user.image} alt="profile" />
          </figure>
        </div>

        <div className="column is-paddingless">
          <p className="is-size-7">
            {user.name} {user.surname}
          </p>

          <UserBadge />
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserCard = withRouter(
  connect(store => ({ user: store.user }))(_UserCard)
);
