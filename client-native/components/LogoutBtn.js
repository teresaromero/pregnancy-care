import React from "react";
import AuthApi from "../lib/APIs/authApi";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

class _LogoutBtn extends React.Component {
  handleLogOut() {
    let { navigation } = this.props;
    AuthApi.logout().then(() => {
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
            color="#f28c81"
          />
        }
        onPress={() => this.handleLogOut()}
      />
    );
  }
}

export const LogoutBtn = withNavigation(_LogoutBtn);
