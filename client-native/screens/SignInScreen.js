import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import AuthApi from "../lib/APIs/authApi";
import { login } from "../lib/redux/actions";

class _SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { email, password } = this.state;

    AuthApi.login(email, password)
      .then(user => {
        console.log(user)
        dispatch(login(user))
        navigation.navigate("SignedIn")
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Input
            placeholder="Email address..."
            onChangeText={email => this.setState({ email })}
          />

          <Input
            secureTextEntry
            placeholder="Password..."
            onChangeText={password => this.setState({ password })}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => this.handleSubmit()}
          />
        </Card>
      </View>
    );
  }
}

export const SignIn = connect()(_SignIn);
