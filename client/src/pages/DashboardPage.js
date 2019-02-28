import React from "react";
import WorkRiskGraph from "../components/BarChart";
import { withRouter } from "react-router-dom";
import ScatterChartComponent from "../components/ScatterChart";
import RadarChartComponent from "../components/RadarChart";
import { branch, renderComponent } from "recompose";

import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { gqlLodash } from "../components/gqlLodash";
import _ from "lodash";

const enhance = branch(
  ({ getWorkRisksQuery }) => getWorkRisksQuery.loading,
  renderComponent(<p>Loading</p>)
);

const getWorkRisksQuery = gql`
  {
    workRiskQuery: records {
      workRisk
    }

    menstrQuery: records {
      menstrualCycleDays
      menstrualCycleFrequency
    }

    pregType: records @_(countBy: "pregnancyType") {
      pregnancyType
    }
  }
`;

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
  <div className="section has-background-white">
    <div className="section">
      <p className="title">Welcome back!</p>
      <p>Here you can see an overview of your patients record</p>
    </div>
    <div className="columns is-paddingless is-marginless">
      <div className="column">
        <p>Principal Risks at Work for Pregnants</p>
        <WorkRiskGraph data={workRisk({ data })} />
      </div>
      <div className="column is-three-fifths">
        <p>Duration and Frequency of Period</p>
        <ScatterChartComponent data={menstCycle({ data })} />
      </div>
    </div>
    <div className="section">
      <p>Origin of pregnancies</p>
      <RadarChartComponent data={pregType({ data })} />
    </div>
  </div>
);

export default gqlLodash(getWorkRisksQuery)(withRouter(DashboardPage));
