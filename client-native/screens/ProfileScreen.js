import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Avatar, ListItem, Text } from "react-native-elements";
import { graphql } from "react-apollo";
import { currentUserQueryProfile } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const Profile = ({ data }) => (
  <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 20 }}
    >
      <Avatar
        size="large"
        rounded
        source={{
          uri: data.currentUser.image
        }}
      />
    </View>
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 20 }}>
        {data.currentUser.name} {data.currentUser.surname}
      </Text>
    </View>
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
        {data.currentUser.email}
      </Text>
    </View>
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 15 }}>
        Contact phone: {data.currentUser.phone}
      </Text>
    </View>

    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop:50,paddingTop: 10 }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15, color:"#f28c81" }}>
        Emergency Call
      </Text>
    </View>
    
  </View>
);

export default graphql(currentUserQueryProfile)(enhance(Profile));
