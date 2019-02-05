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

const _Dashboard = ({ user }) => {
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
                <div className="mainContent">
                  <div className="section">
                    <Switch>
                      <Route
                        exact
                        strict
                        path={`/dashboard`}
                        component={DashboardPage}
                      />
                      <Route
                        exact
                        path={`/dashboard/patients`}
                        component={PatientsPage}
                      />
                      <Route
                        exact
                        path={`/dashboard/patients/add`}
                        component={AddPatientPage}
                      />
                      <Route
                        exact
                        path={`/dashboard/patients/advancedSearch`}
                        component={AdvancedSearchPage}
                      />
                      <Route
                        exact
                        path={`/dashboard/vademecum`}
                        component={VademecumPage}
                      />
                      <Route exact path={`/profile`} component={ProfilePage} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <p>not allowed</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export const Dashboard = withRouter(
  connect(store => ({ user: store.user }))(_Dashboard)
);
