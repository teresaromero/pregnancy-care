import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Avatar, ListItem } from "react-native-elements";
import { graphql } from "react-apollo";
import { currentUserQueryProfile } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";


const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const Profile = ({ data }) => (
  <View style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
    <Card
      style={[styles.container, styles.horizontal]}
      title={data.currentUser.name}
    >
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Avatar
          rounded
          source={{
            uri: data.currentUser.image
          }}
        />
      </View>
    </Card>
    <View>
      <ListItem title="Email" subtitle={data.currentUser.email} />
      <ListItem title="Phone" subtitle={data.currentUser.phone} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 50
  }
});

export default graphql(currentUserQueryProfile)(enhance(Profile));
