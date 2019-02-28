import React from "react";
import { ScrollView, ActivityIndicator, View, Dimensions } from "react-native";
import { Text } from "react-native-elements";

import { graphql } from "react-apollo";
import { currentUserQueryRecord } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

import BarChart from "../components/BarChart";
import ScatterPlot from "../components/ScatterPlot";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const getBloodPressureValues = data => {
  return data.currentUser.record.bloodPressure.map(bp => {
    return { s: bp.Systolic, d: bp.Diastolic };
  });
};

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
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 18 }}>
            Height: {data.currentUser.record.height} cm
          </Text>
        </View>
        <View
          style={{
            paddingTop: 5,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <BarChart color="#7c96c8" />
        </View>

        <View
          style={{
            paddingTop: 5,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {/* <ScatterPlot color="#7c96c8" /> */}
        </View>
      </ScrollView>
    </View>
  </React.Fragment>
);

export default graphql(currentUserQueryRecord)(enhance(Record));
