import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserBadge } from "./UserBadge";

const _UserCard = ({ user }) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  className="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="profile"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">
                {user.name} {user.surname}
              </p>
              <p className="subtitle is-7">Role: {user.role}</p>
            </div>
          </div>
        </div>
        <header className="card-header userCard">
        <UserBadge/>
          <NavLink to="/profile">
            <span className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-user-edit" aria-hidden="true" />
              </span>
            </span>
          </NavLink>
        </header>
      </div>
    </React.Fragment>
  );
};

export const UserCard = withRouter(connect(store => ({ user: store.user }))(_UserCard));
