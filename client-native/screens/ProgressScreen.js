import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Dimensions,
  StyleSheet
} from "react-native";
import { Text } from "react-native-elements";
import * as shape from "d3-shape";
import { graphql } from "react-apollo";
import { currentUserQueryRecord } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Line } from "react-native-svg";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const bpSystolic = data => {
  return data.record.bloodPressure.map(bp => {
    return bp.Systolic;
  });
};

const bpDiastolic = data => {
  return data.record.bloodPressure.map(bp => {
    return bp.Diastolic;
  });
};

const weightData = data => {
  return data.record.weight.map(w => {
    return w.value;
  });
};

const IMCData = (data, height) => {
  let hcm = height / 100;
  return data.record.weight.map(w => {
    return w.value / (hcm * hcm);
  });
};

const HorizontalLineRed = ({ y }) => (
  <Line
    key={"zero-axis"}
    x1={"0%"}
    x2={"100%"}
    y1={y(18.5)}
    y2={y(18.5)}
    stroke={"red"}
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
    stroke={"green"}
    strokeDasharray={[4, 8]}
    strokeWidth={2}
  />
);

const Gradient = () => (
  <Defs key={"gradient"}>
    <LinearGradient id={"gradient"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
      <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} />
      <Stop offset={"100%"} stopColor={"rgb(66, 194, 244)"} />
    </LinearGradient>
  </Defs>
);

const Record = ({ data }) => (
  <React.Fragment>
    <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
      <ScrollView>
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            flex: 1,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Weight (kg)
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            padding: 20,
            flexDirection: "row"
          }}
        >
          <YAxis
            data={weightData(data.currentUser)}
            style={{ marginBottom: 5 }}
            contentInset={{ top: 0, bottom: 0 }}
            svg={{ fontSize: 10, fill: "grey" }}
            numberOfTicks={5}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ height: 200, width: 300 }}
              data={weightData(data.currentUser)}
              svg={{
                strokeWidth: 2,
                stroke: "url(#gradient)"
              }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveBasis}
              gridMin={40}
              gridMax={80}
            >
              <Grid />
              <Gradient />
            </LineChart>
          </View>
        </View>

        <View
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            flex: 1,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            IMC (kg/m2) - Height:{data.currentUser.record.height} cm
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            padding: 20,
            flexDirection: "row"
          }}
        >
          <YAxis
            data={IMCData(data.currentUser, data.currentUser.record.height)}
            style={{ marginBottom: 0 }}
            contentInset={{ top: -20, bottom: -20 }}
            svg={{ fontSize: 10, fill: "grey" }}
            numberOfTicks={6}
            min={16}
            max={45}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ height: 200, width: 300 }}
              data={IMCData(data.currentUser, data.currentUser.record.height)}
              svg={{
                strokeWidth: 2,
                stroke: "url(#gradient)"
              }}
              contentInset={{ top: 20, bottom: 20 }}
              gridMin={16}
              gridMax={45}
              curve={shape.curveBasis}
            >
              <Grid />
              <HorizontalLineRed />
              <HorizontalLineGreen />
              <Gradient />
            </LineChart>
          </View>
        </View>

        <View
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            flex: 1,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Blood Pressure (mmHg)
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            padding: 20,
            flexDirection: "row"
          }}
        >
          <YAxis
            data={bpDiastolic(data.currentUser)}
            style={{ marginBottom: 0 }}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: "grey" }}
            numberOfTicks={6}
          />

          <View style={{ height: 200, width: 300 }}>
            <LineChart
              style={{ flex: 1 }}
              data={bpDiastolic(data.currentUser)}
              svg={{
                strokeWidth: 2,
                stroke: "url(#gradient)"
              }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveBasis}
            >
              <Grid />
              <Gradient />
            </LineChart>
            <LineChart
              style={StyleSheet.absoluteFill}
              data={bpSystolic(data.currentUser)}
              svg={{
                strokeWidth: 2,
                stroke: "url(#gradient)"
              }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveBasis}
            >
              <Gradient />
            </LineChart>
          </View>
          <YAxis
            data={bpSystolic(data.currentUser)}
            style={{ marginBottom: 0 }}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: "red" }}
            numberOfTicks={6}
          />
        </View>
      </ScrollView>
    </View>
  </React.Fragment>
);

export default graphql(currentUserQueryRecord)(enhance(Record));
