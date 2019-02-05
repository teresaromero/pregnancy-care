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
import { FooterNav } from "./FooterNav";

const _Dashboard = ({ match, children, user }) => {
  let { path } = match;
  console.log(children);
  return (
    <React.Fragment>
      <div className="mainLayout">
        {user ? (
          <React.Fragment>
            <div className="columns is-marginless">
              <div className="column is-hidden-mobile	
 is-one-quarter is-paddingless is-marginless">
                <div className="section">
                  <Aside path={path} />
                </div>
              </div>
              <div className="column is-paddingless is-marginless">
                <div className="mainContent">
                  <div className="section">
                    <Switch>
                      <Route
                        exact
                        strict
                        path={`${path}`}
                        component={DashboardPage}
                      />
                      <Route
                        exact
                        strict
                        path={`${path}/patients`}
                        component={PatientsPage}
                      />
                      <Route
                        exact
                        strict
                        path={`${path}/patients/add`}
                        component={AddPatientPage}
                      />
                      <Route
                        exact
                        strict
                        path={`${path}/patients/advancedSearch`}
                        component={AdvancedSearchPage}
                      />
                      <Route
                        exact
                        strict
                        path={`${path}/vademecum`}
                        component={VademecumPage}
                      />
                      <Route
                        exact
                        strict
                        path={`${path}/profile`}
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
