import React from "react";
import { Aside } from "./Aside";
import { DashboardPage } from "../pages/DashboardPage";
import { Switch, Route, Redirect } from "react-router";
import { PatientsPage } from "../pages/PatientsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AddPatientPage } from "../pages/AddPatientPage";
import { AdvancedSearchPage } from "../pages/AdvancedSearchPage";
import {VademecumPage} from '../pages/VademecumPage'



const _Dashboard = ({ match, children, user }) => {
  let { path } = match;
  console.log(children);
  return (
    <React.Fragment>
      <div className="container is-fluid">
        <div className="section">
          <div className="columns">
            {user ? (
              <React.Fragment>
                <Aside path={path} />
                <div className="column dashContent">
                  <Switch>
                    <Route
                      exact
                      strict
                      path={`${path}`}
                      component={DashboardPage}
                    />
                    <Route
                      exact
                      path={`${path}/patients`}
                      component={PatientsPage}
                    />
                    <Route
                      exact
                      path={`${path}/patients/add`}
                      component={AddPatientPage}
                    />
                    <Route
                      exact
                      path={`${path}/patients/advancedSearch`}
                      component={AdvancedSearchPage}
                    />
                    <Route
                      exact
                      path={`${path}/vademecum`}
                      component={VademecumPage}
                    />
                    <Route
                      exact
                      path={`${path}/profile`}
                      component={ProfilePage}
                    />
                  </Switch>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="column">
                  <p>not allowed</p>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Dashboard = withRouter(
  connect(store => ({ user: store.user }))(_Dashboard)
);
