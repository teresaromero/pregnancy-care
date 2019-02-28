import React from "react";
import {
  RadarChart,
  ResponsiveContainer,
  PolarAngleAxis,
  Radar,
  PolarGrid,
  PolarRadiusAxis
} from "recharts";

const RadarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <RadarChart outerRadius={100} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="type" />
      <PolarRadiusAxis angle={55} domain={[0, 50]} />
      <Radar
        dataKey="value"
        stroke="#8884d8"
        fill="#7c96c8"
        fillOpacity={0.6}
      />
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarChartComponent;
