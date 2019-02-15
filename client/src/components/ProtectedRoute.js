import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Loader } from "./Loader";

const _ProtectedRoute = ({ component: Component, user, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user !==null && isAuth === true ? (
          <Component {...props} />
        ) : isAuth === false ? (
          <Loader />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export const ProtectedRoute = withRouter(
  connect(store => ({ user: store.user, isAuth: store.isAuth }))(
    _ProtectedRoute
  )
);
