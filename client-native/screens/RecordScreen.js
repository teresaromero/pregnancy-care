import React from "react";
import { ScrollView, ActivityIndicator, View, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import moment from "moment";

import { graphql } from "react-apollo";
import { currentUserQueryRecord } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

import Bar from "../components/graph";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const getValues = ({ data }, field) => {
  return data.currentUser.record[field].map(w => {
    return w.value;
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
        <Bar/>
      </ScrollView>
    </View>
  </React.Fragment>
);

export default graphql(currentUserQueryRecord)(enhance(Record));
