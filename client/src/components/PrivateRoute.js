import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const _ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export const ProtectedRoute = connect(state => ({ user: state.user }))(
  _ProtectedRoute
);
