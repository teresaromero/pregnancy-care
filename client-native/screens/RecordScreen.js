import React from "react";
import { ScrollView, ActivityIndicator, View, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";
import moment from "moment";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";

class _Record extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: null,
      dataWeight: null,
      dataIMC: null,
      bloodSistolic: null,
      bloodDiastolic: null
    };
  }

  componentDidMount() {
    let { user } = this.props;
    PatientsApi.getPatient(user._id).then(patient => {
      let dataWeight = patient.recordId.weight.map(w => {
        return w.value;
      });
      let dataIMC = patient.recordId.IMC.map(i => {
        return i.value;
      });
      let bloodSistolic = patient.recordId.bloodPressure.map(b => {
        return b.Systolic;
      });
      let bloodDiastolic = patient.recordId.bloodPressure.map(b => {
        return b.Diastolic;
      });
      this.setState(
        { patient, dataIMC, dataWeight, bloodDiastolic, bloodSistolic },
        () => {}
      );
    });
  }

  render() {
    let {
      patient,
      dataIMC,
      dataWeight,
      bloodDiastolic,
      bloodSistolic
    } = this.state;
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          {patient ? (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text style={{ padding: 5, fontWeight: "bold" }} h6>
                  Weight
                </Text>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: dataWeight
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width * 0.9}
                  height={180}
                  chartConfig={{
                    backgroundColor: "#f9e939",
                    backgroundGradientFrom: "#f9e939",
                    backgroundGradientTo: "#f9e939",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    strokeWidth: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      paddingRight: 0,
                      paddingLeft: 0,
                      borderRadius: 5
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 1,
                    borderRadius: 5
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text style={{ padding: 5, fontWeight: "bold" }} h6>
                  IMC
                </Text>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: dataIMC
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width * 0.9}
                  height={180}
                  chartConfig={{
                    backgroundColor: "#a4cf7c",
                    backgroundGradientFrom: "#a4cf7c",
                    backgroundGradientTo: "#a4cf7c",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    strokeWidth: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      paddingRight: 0,
                      paddingLeft: 0,
                      borderRadius: 5
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 1,
                    borderRadius: 5
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text style={{ padding: 5, fontWeight: "bold" }} h6>
                  Blood Pressure
                </Text>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: bloodDiastolic
                      },
                      { data: bloodSistolic }
                    ]
                  }}
                  width={Dimensions.get("window").width * 0.9}
                  height={180}
                  chartConfig={{
                    backgroundColor: "#91d4f2",
                    backgroundGradientFrom: "#91d4f2",
                    backgroundGradientTo: "#91d4f2",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    strokeWidth: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      paddingRight: 0,
                      paddingLeft: 0,
                      borderRadius: 5
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 1,
                    borderRadius: 5
                  }}
                />
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
export const Record = connect(store => ({ user: store.user }))(_Record);
