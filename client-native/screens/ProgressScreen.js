import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text } from "react-native-elements";

import { graphql } from "react-apollo";
import { currentUserQueryRecord } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

import { WeightChart } from "../components/WeightChart";
import { IMCChart } from "../components/IMCChart";
import { BloodPressureChart } from "../components/BloodPressureChart";

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

const IMCData = data => {
  return data.record.IMC.map(i => {
    return i.value;
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
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Weight (kg)
          </Text>
        </View>
        <WeightChart data={weightData(data.currentUser)} />
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            IMC (kg/m2) - Height:{data.currentUser.record.height} cm
          </Text>
        </View>

        <IMCChart data={IMCData(data.currentUser)} />
        <View
          style={{
            padding: 15,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}>
            ❗ Recomended weight gain:
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
            IMC Normal (18,5 - 24,9): between 11.5kg and 16kg
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
            IMC Overweight (25 - 29,9): between 7kg and 12,5kg
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
            IMC Obese (>30): between 5kg and 9kg
          </Text>
        </View>
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Blood Pressure (mmHg)
          </Text>
        </View>

        <BloodPressureChart
          diastolic={bpDiastolic(data.currentUser)}
          sistolic={bpSystolic(data.currentUser)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Text
            style={{
              color: "#8ac6bf",
              fontFamily: "SourceSansPro-Regular",
              fontSize: 15
            }}
          >
            Systolic
          </Text>
          <Text
            style={{
              color: "#01395c",
              fontFamily: "SourceSansPro-Regular",
              fontSize: 15
            }}
          >
            Diastolic
          </Text>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "center",
            alignItems: "left"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}>
            ❗ Recomended blood pressure:
          </Text>
          <View
            style={{
              flex:1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{flex:1}}>
              <Text
                style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
              >
                Normal
              </Text>
              <Text
                style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
              >
                Prehypertension
              </Text>
              <Text
                style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
              >
                Hypertension
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text
                style={{
                  color: "#8ac6bf",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                Under 120
              </Text>
              <Text
                style={{
                  color: "#8ac6bf",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                120 - 139
              </Text>
              <Text
                style={{
                  color: "#8ac6bf",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                Above 140
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text
                style={{
                  color: "#01395c",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                Under 80
              </Text>
              <Text
                style={{
                  color: "#01395c",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                80 - 89
              </Text>
              <Text
                style={{
                  color: "#01395c",
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 15
                }}
              >
                Above 90
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  </React.Fragment>
);

export default graphql(currentUserQueryRecord)(enhance(Record));
