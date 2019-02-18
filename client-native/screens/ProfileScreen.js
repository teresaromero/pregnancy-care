import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Card, Button, Text } from "react-native-elements";

import { connect } from "react-redux";
import AuthApi from "../lib/APIs/authApi";
import { logout } from "../lib/redux/actions";

class _Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

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
      <View style={{ paddingVertical: 20 }}>
        {user ? (
          <Card title={user.name}>
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
              <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
            </View>
            <Button
              backgroundColor="#03A9F4"
              title="SIGN OUT"
              onPress={() => this.handleLogOut()}
            />
          </Card>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

export const Profile = connect(store => ({ user: store.user }))(_Profile);
