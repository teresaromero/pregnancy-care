import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ScatterChart,
  ResponsiveContainer
} from "recharts";

const ScatterChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={180}>
    <ScatterChart
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="menstrualCycleFrequency"
        scale="auto"
        type="number"
        domain={["dataMin", "dataMax"]}
      />
      <YAxis
        dataKey="menstrualCycleDays"
        type="number"
        domain={["dataMin", "dataMax"]}
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter data={data} fill="#7c96c8" />
    </ScatterChart>
  </ResponsiveContainer>
);

export default ScatterChartComponent;
