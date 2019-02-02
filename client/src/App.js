import React, { Component } from "react";
import { Switch, Route } from "react-router";
import  HomePage  from "./pages/HomePage";

import { Dashboard } from "./components/Dashboard";
import { DashboardPage } from "./pages/DashboardPage";
import { PatientsPage } from "./pages/PatientsPage";
import { ProtectedRoute } from "./components/PrivateRoute";
import { ProfilePage } from "./pages/ProfilePage";

const HomePageContainer = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={HomePage} />
    </React.Fragment>
  );
};

const DashboardPageContainer = () => {
  return (
    <React.Fragment>
      <Dashboard>
        <Route
          exact
          strict
          path="/dashboard"
          component={DashboardPage}
          key="dashboard-page"
        />
        <Route
          exact
          strict
          path="/patients"
          component={PatientsPage}
        
          key="patients-page"
        />
        <Route
          exact
          strict
          path="/profile"
          component={ProfilePage}
          key="profile-page"
        />
      </Dashboard>
    </React.Fragment>
  );
};

export default class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Switch location={location}>
              <Route
                exact
                strict
                path="/"
                component={HomePageContainer}
                key="homepage"
              />
              <ProtectedRoute component={DashboardPageContainer} />
            </Switch>
          </div>
        )}
      />
    );
  }
}
