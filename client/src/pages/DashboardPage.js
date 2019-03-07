import React from "react";
import WorkRiskGraph from "../components/BarChart";
import { withRouter, NavLink } from "react-router-dom";
import ScatterChartComponent from "../components/ScatterChart";
import RadarChartComponent from "../components/RadarChart";
import { branch, renderComponent } from "recompose";
import moment from "moment";

import { gqlLodash } from "../components/gqlLodash";
import _ from "lodash";
import { Loader } from "../components/Loader";
import { dashboardQueries } from "../lib/graphQL/queries";

const enhance = branch(({ data }) => data.loading, renderComponent(Loader));

const workRisk = ({ data }) => {
  let unified = _.groupBy(
    _.flattenDeep(_.map(data.workRiskQuery, "workRisk")).map(e => {
      return { risk: e };
    }),
    "risk"
  );
  let arr = [];
  Object.keys(unified).forEach(item => {
    let obj = { name: item, value: unified[item].length };
    arr.push(obj);
  });

  return arr;
};

const menstCycle = ({ data }) => {
  return data.menstrQuery;
};

const pregType = ({ data }) => {
  let { pregType } = data;
  let arr = [];

  if (!data.loading) {
    Object.keys(pregType).forEach(item => {
      let obj = { type: item, value: pregType[item] };
      arr.push(obj);
    });
  }

  return arr;
};

const DashboardPage = ({ data }) => (
  <div className="content">
    <section className="hero is-primary is-small">
      <div className="hero-body">
        <div className="content">
          <h1 className="title">Welcome back!</h1>
        </div>
      </div>
    </section>
    <section className="info-tiles section">
      <div className="tile is-ancestor has-text-centered">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">{data.allAppointments.length}</p>
            <p className="subtitle">Booked Appointments</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">{data.allPatients.length}</p>
            <p className="subtitle">Patients</p>
          </article>
        </div>
      </div>
    </section>

    <div className="columns is-paddingless is-marginless">
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title"> Todays patients</p>
            <span className="card-header-icon">
              <span className="icon">
                <i className="fa fa-angle-down" />
              </span>
            </span>
          </header>

          <div className="card-content">
            <div className="timeline">
              {data.todayAppointments.map(ap => (
                <div key={ap.title} className="timeline-item">
                  <div className="timeline-marker is-primary" />
                  <div className="timeline-content">
                    <p className="heading">
                      {moment(ap.start).format("HH:mm")}
                    </p>
                    <p>
                      {ap.title} - {ap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <NavLink to="/admin/agenda" className="card-footer-item">
              View Agenda
            </NavLink>
          </div>
        </div>
      </div>
      <div className="column is-6">
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-content">
            <p>Principal Risks at Work for Pregnants</p>
            <WorkRiskGraph data={workRisk({ data })} />
          </div>
        </div>

        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-content">
            <p>Duration and Frequency of Period</p>
            <ScatterChartComponent data={menstCycle({ data })} />
          </div>
        </div>

        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-content">
            <p>Origin of pregnancies</p>
            <RadarChartComponent data={pregType({ data })} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default gqlLodash(dashboardQueries)(withRouter(enhance(DashboardPage)));
