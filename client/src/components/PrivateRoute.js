import React from "react";
import {Route,Redirect} from "react-router-dom";
import { connect } from "react-redux";

export const _PrivateRoute = ({ component: Component, user,...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export const PrivateRoute = connect(state => ({ user: state.user }))(_PrivateRoute);