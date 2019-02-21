import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

import {HomePage} from "./pages/HomePage";
import { FooterNav } from "./components/FooterNav";
import { ProtectedRoute } from "./components/ProtectedRoute";

class _App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            {this.props.children}
            <Route
              exact
              path="/"
              render={() =>
                this.props.user && this.props.isAuth ? (
                  <Redirect to="/admin" />
                ) : (
                  <HomePage />
                )
              }
            />

            <ProtectedRoute path="/admin" component={Dashboard} />
            {this.props.user ? <FooterNav /> : null}
          </div>
        )}
      />
    );
  }
}

export const App = withRouter(
  connect(store => ({ user: store.user, isAuth: store.isAuth }))(_App)
);
