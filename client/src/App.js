import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { DashboardPage } from "./pages/DashboardPage";
import { PatientsPage } from "./pages/PatientsPage";
import { ProtectedRoute } from "./components/PrivateRoute";
import { ProfilePage } from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";

const WelcomePageContainer = () => {
  return (
    <React.Fragment>
      <Route exact path="/welcome" component={WelcomePage} />
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
          path="/"
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

class _App extends Component {
  render() {
    let { user } = this.props;
    return user ? (
      <Route
        render={({ location }) => (
          <div className="App">
            <Switch location={location}>
              <Route
                exact
                strict
                path="/welcome"
                component={WelcomePageContainer}
                key="homepage"
              />
              <ProtectedRoute component={DashboardPageContainer} />
            </Switch>
          </div>
        )}
      />
    ) : (
      <p>Loading</p>
    );
  }
}

export const App = connect(store => ({ user: store.user }))(withRouter(_App));
