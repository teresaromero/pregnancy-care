import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserBadge } from "./UserBadge";

const _UserCard = ({ user, match }) => {
  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <figure className="image is-64x64">
            <img className="is-rounded" src={user.image} alt="profile" />
          </figure>
        </div>

        <div className="column">
          <NavLink to={`${match.url}/profile`}>
            <p className="title is-6">
              {user.name} {user.surname}
            </p>
          </NavLink>

          <UserBadge />
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserCard = withRouter(
  connect(store => ({ user: store.user }))(_UserCard)
);
