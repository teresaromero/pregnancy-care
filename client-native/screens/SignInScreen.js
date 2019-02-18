import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Card, Button, Input, Text } from "react-native-elements";
import AuthApi from "../lib/APIs/authApi";
import { login, errorMessageAction, clearMessages } from "../lib/redux/actions";

class _SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount(){
   let {dispatch} = this.props;
   dispatch(clearMessages())
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { email, password } = this.state;

    if (email === "" || password === "") {
      dispatch(errorMessageAction("You have to enter data"));
    } else {
      AuthApi.login(email, password)
        .then(user => {
          if (user !== undefined || user !==null) {
            dispatch(login(user));
            navigation.navigate("SignedIn");
          } else {
            dispatch(errorMessageAction("User not found"));
          }
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    let { messages } = this.props;
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
        {messages.map(m => (
          <Text key={m}>{m}</Text>
        ))}
      </View>
    );
  }
}

export const SignIn = connect(store => ({ messages: store.messages }))(_SignIn);
