import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const ProtectedRoute = connect(store => ({ user: store.user }))(
  ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  )
);
