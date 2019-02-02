import React from "react";
import { ProfileView } from "../components/ProfileView";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

const _ProfilePage = () => {
  return <ProfileView />;
};

export const ProfilePage = connect(state => ({ user: state.user }))(
  withRouter(_ProfilePage)
);
