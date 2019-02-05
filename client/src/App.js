import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

import { Navbar } from "./components/Navbar";

import { LogoutPage } from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";
import { FooterNav } from "./components/FooterNav";

class _App extends Component {
  render() {
    let { user } = this.props;
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Navbar />

            {this.props.children}

            <Route
              exact
              strict
              path="/"
              render={() =>
                user ? <Redirect to="/dashboard" /> : <HomePage />
              }
            />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/dashboard" component={Dashboard} />
            {user ? <FooterNav path="/dashboard" /> : null}
          </div>
        )}
      />
    );
  }
}

export const App = withRouter(connect(store => ({ user: store.user }))(_App));
