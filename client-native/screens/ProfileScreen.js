import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Image,
  Icon,
  Text,
  Avatar,
  ListItem,
  Header
} from "react-native-elements";

import { connect } from "react-redux";
import AuthApi from "../lib/APIs/authApi";
import { logout } from "../lib/redux/actions";

class _Profile extends React.Component {
  handleLogOut() {
    let { dispatch, navigation } = this.props;
    AuthApi.logout().then(() => {
      dispatch(logout());
      navigation.navigate("SignedOut");
    });
  }

  render() {
    let { user } = this.props;

    return (
      <React.Fragment>
        <View>
          {user ? (
            <React.Fragment>
              <Card
                style={[styles.container, styles.horizontal]}
                title={user.name}
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
                      uri: user.image
                    }}
                  />
                </View>
              </Card>
              <View>
                <ListItem title="Email" subtitle={user.email} />
                <ListItem title="Phone" subtitle={user.phone} />
              </View>
            </React.Fragment>
          ) : (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </React.Fragment>
    );
  }
}

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

export const Profile = connect(store => ({ user: store.user }))(_Profile);
