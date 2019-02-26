import React from "react";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { Card, Button, Input, Text, Image } from "react-native-elements";
import AuthApi from "../lib/APIs/authApi";
import { login, errorMessageAction, clearMessages } from "../lib/redux/actions";
import { logo } from "../assets/images/logo.png";

class _SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(clearMessages());
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { email, password } = this.state;

    if (email === "" || password === "") {
      dispatch(errorMessageAction("You have to enter data"));
    } else {
      AuthApi.login(email, password)
        .then(user => {
          if (user !== undefined) {
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#01395c"
        }}
      >
        <View
          style={{
            flex: 1,
            width: "90%",
            paddingTop: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              width: Dimensions.get("screen").width * 0.8,
              resizeMode: "contain"
            }}
          />
        </View>

        <View style={{ flex: 2, width: Dimensions.get("screen").width * 0.9 }}>
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
              color="#01395c"
              title="Sign In"
              type="clear"
              onPress={() => this.handleSubmit()}
            />
          </Card>
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {messages.map(m => (
              <Text key={m} style={{ color: "red" }}>
                {m}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export const SignIn = connect(store => ({ messages: store.messages }))(_SignIn);
