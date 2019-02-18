import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Button, Image, Icon, Text } from "react-native-elements";

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
      <View style={{ paddingTop: 50 }}>
        {user ? (
          <Card style={[styles.container, styles.horizontal]} title={user.name}>
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
              <Image
                source={{ uri: `${user.image}` }}
                style={{ width: 80, height: 80 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View>
              <Text>{user.email}</Text>
            </View>
            <Button
              type="clear"
              icon={
                <Icon
                  name="power-off"
                  type="font-awesome"
                  size={15}
                  color="#FF3860"
                />
              }
              title=" Logout"
              titleStyle={{ color: "#FF3860" }}
              onPress={() => this.handleLogOut()}
            />
          </Card>
        ) : (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator />
          </View>
        )}
      </View>
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
