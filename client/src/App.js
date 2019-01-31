import React, { Component } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileForm } from "./pages/ProfileForm";
import { PrivateRoute } from "./components/PrivateRoute";



export default class App extends Component {
   
  render() {
    return (
      <React.Fragment>
        <Route
          render={({ location }) => (
            <div className="App">
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
                  component={SignUpPage}
                  key="signup-page"
                />
                <Route
                  exact
                  strict
                  path="/login"
                  component={LoginPage}
                  key="login-page"
                />
                <Route
                  exact
                  strict
                  path="/profile"
                  component={ProfileForm}
                  key="profile-page"
                />
              </Switch>
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}
