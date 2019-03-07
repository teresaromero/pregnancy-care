import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  LabelList
} from "recharts";

const WorkRiskGraph = ({ data }) => (
  <ResponsiveContainer width="100%" height={180}>
    <BarChart data={data} layout={"vertical"}>
    
      <XAxis type="number" />
      <YAxis hide={true} type="category" />
      <Bar dataKey="value" fill="#7c96c8">
        <LabelList dataKey="name" position="insideRight" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default WorkRiskGraph;
