import React, { Component } from "react";
import {  Route} from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";


import { Navbar } from "./components/Navbar";

import { LogoutPage } from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";

class _App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Navbar />

            {this.props.children}

            <Route exact strict path="/" component={HomePage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        )}
      />
    );
  }
}

export const App = withRouter(connect(store => ({ user: store.user }))(_App));
