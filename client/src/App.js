import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { DashboardPage } from "./pages/DashboardPage";
import { PatientsPage } from "./pages/PatientsPage";
import { ProtectedRoute } from "./components/PrivateRoute";
import { ProfilePage } from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";

const DashboardPageContainer = () => {
  return (
    <React.Fragment>
      <Dashboard>
        <Route
          exact
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

class _App extends Component {
  render() {
    let { user } = this.props;
    return (
      <div className="App">
        <Switch location={this.props.location}>
          {user ? (
            <ProtectedRoute component={DashboardPageContainer} />
          ) : (
            <React.Fragment>
              <Redirect from="/" to="/welcome" />
              <Route path="/welcome" component={WelcomePage} />
            </React.Fragment>
          )}
        </Switch>
      </div>
    );
  }
}

export const App = connect(store => ({ user: store.user }))(withRouter(_App));
