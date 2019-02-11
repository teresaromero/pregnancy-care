import React from "react";
import { Aside } from "./Aside";
import { DashboardPage } from "../pages/DashboardPage";
import { Switch, Route } from "react-router";
import { PatientsPage } from "../pages/PatientsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AddPatientPage } from "../pages/AddPatientPage";
import { AdvancedSearchPage } from "../pages/AdvancedSearchPage";
import { VademecumPage } from "../pages/VademecumPage";
import HomePage from "../pages/HomePage";
import { RecordPage } from "../pages/RecordPage";
import { AgendaOverviewPage } from "../pages/AgendaOverviewPage";
import { PregnancyDetail } from "./PregnancyDetail";

const _Dashboard = ({ user, location, match }) => {
  return (
    <React.Fragment>
      <div className="mainLayout">
        {user ? (
          <React.Fragment>
            <div className="columns is-marginless">
              <div
                className="column is-hidden-mobile	
 is-one-quarter is-paddingless is-marginless"
              >
                <div className="section">
                  <Aside />
                </div>
              </div>
              <div className="column is-paddingless is-marginless">
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
                      path={`${match.url}/patients/pregnancy/:id`}
                      component={PregnancyDetail}
                    />

                    <Route
                      path={`${match.url}/patients/add`}
                      component={AddPatientPage}
                    />
                    <Route
                      path={`${match.url}patients/advancedSearch`}
                      component={AdvancedSearchPage}
                    />

                    <Route
                      path={`${match.url}/patients`}
                      component={PatientsPage}
                    />
                    <Route
                      path={`${match.url}/overview`}
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HomePage />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export const Dashboard = withRouter(
  connect(store => ({ user: store.user }))(_Dashboard)
);
