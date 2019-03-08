import React from "react";
import { View } from "react-native";
import _ from "lodash";
import * as shape from "d3-shape";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Line, Circle } from "react-native-svg";


const HorizontalLineRed = ({ y }) => (
  <Line
    key={"zero-axis"}
    x1={"0%"}
    x2={"100%"}
    y1={y(18.5)}
    y2={y(18.5)}
    stroke={"#f28c81"}
    strokeDasharray={[4, 8]}
    strokeWidth={2}
  />
);
const HorizontalLineGreen = ({ y }) => (
  <Line
    key={"zero-axis"}
    x1={"0%"}
    x2={"100%"}
    y1={y(24.9)}
    y2={y(24.9)}
    stroke={"#f28c81"}
    strokeDasharray={[4, 8]}
    strokeWidth={2}
  />
);

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={2}
      stroke={"#01395c"}
      fill={"#01395c"}
    />
  ));
};

const axesSvg = { fontSize: 10, fill: "#01395c" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

export const IMCChart = ({ data }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      height: 200,
      margin: 10,
      padding: 10,
      flexDirection: "row",
      backgroundColor: "#f0e5d6"
    }}
  >
    <YAxis
      data={data}
      style={{ marginBottom: xAxisHeight }}
      contentInset={verticalContentInset}
      svg={axesSvg}
      numberOfTicks={data.length}
      min={_.min(data)}
      max={_.max(data)}
    />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <LineChart
        style={{ flex: 1 }}
        data={data}
        svg={{
          strokeWidth: 1,
          stroke: "#01395c"
        }}
        contentInset={verticalContentInset}
        curve={shape.curveNatural}
        numberOfTicks={data.length}
        minY={_.min(data)}
        maxY={_.max(data)}
      >
        <Grid
          svg={{
            strokeWidth: 0.5,
            stroke: "#7c96c8"
          }}
        />
        <HorizontalLineRed />
        <HorizontalLineGreen />
        <Decorator data={data} />
      </LineChart>
      <XAxis
        style={{ marginHorizontal: -10, height: xAxisHeight }}
        data={data}
        formatLabel={(value, index) => index}
        contentInset={{ left: 10, right: 10 }}
        svg={axesSvg}
        numberOfTicks={data.length}
      />
    </View>
  </View>
);
