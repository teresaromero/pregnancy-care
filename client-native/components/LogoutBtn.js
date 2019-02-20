import React from "react";
import AuthApi from "../lib/APIs/authApi";
import { connect } from "react-redux";
import { logout } from "../lib/redux/actions";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

class _LogoutBtn extends React.Component {
  handleLogOut() {
    let { dispatch, navigation } = this.props;
    AuthApi.logout().then(() => {
      dispatch(logout());
      navigation.navigate("SignedOut");
    });
  }

  render() {
    return (
      <Button
        type="clear"
        icon={
          <Icon
            name="power-off"
            type="font-awesome"
            size={20}
            color="#FF3860"
          />
        }
        
        onPress={() => this.handleLogOut()}
      />
    );
  }
}

export const LogoutBtn = withNavigation(connect()(_LogoutBtn));
