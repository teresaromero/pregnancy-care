import React from "react";
import { ScrollView, ActivityIndicator, View, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";
import moment from "moment";
import {
  LineChart,
  BarChart,
  Grid,
  YAxis,
  XAxis,
  Path
} from "react-native-svg-charts";

class _Record extends React.Component {
  getWeight() {
    let { patient } = this.props;
    let dataWeight = patient.recordId.weight.map(w => {
      return w.value;
    });
    return dataWeight;
  }

  getBloodSystolic() {
    let { patient } = this.props;
    return patient.recordId.bloodPressure.map(b => {
      return b.Systolic;
    });
  }

  getBloodDiastolic() {
    let { patient } = this.props;
    return patient.recordId.bloodPressure.map(b => {
      return b.Diastolic;
    });
  }

  getIMC() {
    let { patient } = this.props;
    return patient.recordId.IMC.map(i => {
      return i.value;
    });
  }

  render() {
    let { patient } = this.props;
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          {patient ? (
            <ScrollView>
              <View style={{ height: 250, padding: 20, flexDirection: "row" }}>
                <YAxis
                  data={this.getWeight()}
                  style={{ marginBottom: 30 }}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fontSize: 10, fill: "grey" }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart
                    style={{ flex: 1 }}
                    data={this.getWeight()}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ strokeWidth: 2, stroke: "rgb(134, 65, 244)" }}
                  >
                    <Grid />
                  </LineChart>
                  <XAxis
                    style={{ marginHorizontal: -10, height: 30 }}
                    data={this.getWeight()}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: "grey" }}
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </React.Fragment>
    );
  }
}
export const Record = connect(store => ({
  user: store.user,
  patient: store.patient
}))(_Record);
