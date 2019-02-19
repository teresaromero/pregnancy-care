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
      patient: null
    };
  }

  componentDidMount() {
    let { user } = this.props;
    PatientsApi.getPatient(user._id).then(patient => {
      this.setState({ patient }, () => {
        console.log(this.state.patient.recordId.LMP);
      });
    });
  }

  render() {
    let { user } = this.props;
    let { patient } = this.state;
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
                <Text>Weight</Text>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
                      },
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ]
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width * 0.9}
                  height={180}
                  chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    strokeWidth:1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      paddingRight:0,
                      paddingLeft:0,
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
