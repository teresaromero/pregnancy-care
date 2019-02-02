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
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  className="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="profile-picture"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-5">
                {user.name} {user.surname}
              </p>
              <p class="subtitle is-7">Role: {user.role}</p>
            </div>
          </div>
        </div>
        <header class="card-header userCard">
        <UserBadge/>
          <NavLink to="/profile">
            <span class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-user-edit" aria-hidden="true" />
              </span>
            </span>
          </NavLink>
        </header>
      </div>
    </React.Fragment>
  );
};

export const UserCard = connect(state => ({ user: state.user }))(
  withRouter(_UserCard)
);
