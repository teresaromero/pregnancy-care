import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text } from "react-native-elements";

import { graphql } from "react-apollo";
import { currentUserQueryInformation } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";
import moment from "moment";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const Information = ({ data }) => (
  <React.Fragment>
    <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
      <ScrollView style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <View
          style={{
            padding: 15,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Blood Group
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 18 }}>
            {data.currentUser.record.bloodGroup} {data.currentUser.record.rh}
          </Text>
        </View>
        <View
          style={{
            padding: 15,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Pregnancy
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 18 }}>
            {data.currentUser.record.pregnancyType}
          </Text>
        </View>
        <View
          style={{
            padding: 15,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Risk
          </Text>
          <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 18 }}>
            {data.currentUser.record.risk}
          </Text>
        </View>
        <View
          style={{
            padding: 15,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-start",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Your doctor information
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
             Dr. Pregnancy Care - phone: 99 999 999
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 15,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-start",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 18 }}>
            Recomendations at visits
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            {data.currentUser.record.visits.map(v => (
              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
                >
                  🗓{moment(v.date).format("ddd Do MMM YY")}
                </Text>
                <Text
                  style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}
                >
                  {v.notesOut}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  </React.Fragment>
);

export default graphql(currentUserQueryInformation)(enhance(Information));
