import React, { Component } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

export default class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Navbar location={location}/>

            <nav
              className="navbar is-fixed-bottom is-dark"
              aria-label="footer"
            />
            <Switch location={location}>
              <Route
                exact
                strict
                path="/"
                component={HomePage}
                key="homepage"
              />
              <Route
                exact
                strict
                path="/signup"
                component={SignupPage}
                key="signup-page"
              />
              <Route
                exact
                strict
                path="/login"
                component={LoginPage}
                key="login-page"
              />
            </Switch>
          </div>
        )}
      />
    );
  }
}
