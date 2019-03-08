import React from "react";
import { View } from "react-native";
import _ from "lodash";
import * as shape from "d3-shape";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Circle } from "react-native-svg";

const axesSvg = { fontSize: 10, fill: "#01395c" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

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

export const WeightChart = ({ data }) => (
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
      >
        <Grid
          svg={{
            strokeWidth: 0.5,
            stroke: "#7c96c8"
          }}
        />
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
