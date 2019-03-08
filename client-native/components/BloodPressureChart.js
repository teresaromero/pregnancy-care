import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
import * as shape from "d3-shape";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Circle } from "react-native-svg";

const Decorator = ({ x, y, data, color }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={2}
      stroke={color}
      fill={color}
    />
  ));
};

const axesSvg = { fontSize: 10, fill: "#01395c" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

const yAxeData = (diastolic, sistolic) => {
  return diastolic.concat(sistolic);
};

export const BloodPressureChart = ({ diastolic, sistolic }) => (
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
      data={yAxeData(diastolic, sistolic)}
      style={{ marginBottom: xAxisHeight }}
      contentInset={verticalContentInset}
      svg={axesSvg}
      numberOfTicks={diastolic.length}
      min={_.min(yAxeData(diastolic, sistolic))}
      max={_.max(yAxeData(diastolic, sistolic))}
    />

    <View style={{ flex: 1, marginLeft: 10 }}>
      <LineChart
        style={{ flex: 1 }}
        data={diastolic}
        svg={{
          strokeWidth: 1,
          stroke: "#8ac6bf"
        }}
        contentInset={verticalContentInset}
        curve={shape.curveNatural}
        numberOfTicks={diastolic.length}
        minY={_.min(diastolic)}
        maxY={_.max(diastolic)}
      >
        <Grid
          svg={{
            strokeWidth: 0.5,
            stroke: "#7c96c8"
          }}
        />
        <Decorator data={diastolic} color={"#8ac6bf"} />
      </LineChart>
      <LineChart
        style={StyleSheet.absoluteFill}
        data={sistolic}
        svg={{
          strokeWidth: 1,
          stroke: "#01395c"
        }}
        contentInset={verticalContentInset}
        curve={shape.curveNatural}
        numberOfTicks={diastolic.length}
        minY={_.min(sistolic)}
        maxY={_.max(sistolic)}
      >
        <Decorator data={sistolic} color={"#01395c"} />
      </LineChart>
      
      <XAxis
        style={{ marginHorizontal: 10, height: xAxisHeight }}
        data={sistolic}
        formatLabel={(value, index) => index}
        contentInset={{ left: 10, right: 10 }}
        svg={axesSvg}
      />
  </View>
  </View>
);
