import React from "react";
import { Aside } from "./Aside";
import { DashboardPage } from "../pages/DashboardPage";
import { Switch, Route } from "react-router";
import  PatientsPage from "../pages/PatientsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { AddPatientPage } from "../pages/AddPatientPage";
import { VademecumPage } from "../pages/VademecumPage";

import { RecordPage } from "../pages/RecordPage";
import { AgendaOverviewPage } from "../pages/AgendaOverviewPage";
import { Navbar } from "./Navbar";

const _Dashboard = ({ user, match }) => {
  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <Navbar />
         
            <div className="columns is-marginless has-background-light">
              <div className="column is-narrow is-hidden-mobile is-3 is-paddingless is-marginless">
                <div className="section">
                  <Aside />
                </div>
              </div>

              <div className="column is-paddingless is-marginless">
              <div className="mainContent has-background-light">
                <div className="section">
                  <Switch>
                    <Route
                      exact
                      strict
                      path={`${match.url}`}
                      component={DashboardPage}
                    />
                    <Route
                      path={`${match.url}/patients/record/:id`}
                      component={RecordPage}
                    />

                    <Route
                      path={`${match.url}/patients/add`}
                      component={AddPatientPage}
                    />

                    <Route
                      path={`${match.url}/patients`}
                      component={PatientsPage}
                    />
                    <Route
                      path={`${match.url}/agenda`}
                      component={AgendaOverviewPage}
                    />
                    <Route
                      path={`${match.url}/vademecum`}
                      component={VademecumPage}
                    />
                    <Route
                      exact
                      path={`${match.url}/profile`}
                      component={ProfilePage}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to="/" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export const Dashboard = withRouter(
  connect(store => ({ user: store.user }))(_Dashboard)
);
