import React from "react";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { Card, Button, Input, Text, Image, Icon } from "react-native-elements";
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
          <Input
            placeholder="Email"
            shake={true}
            onChangeText={email => this.setState({ email })}
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white",
              marginRigth: 5,
              padding: 5
            }}
            placeholderTextColor="grey"
            inputStyle={{ padding: 10, color: "white" }}
          />

          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "white",
              marginRigth: 5,
              padding: 5
            }}
            placeholderTextColor="grey"
            inputStyle={{ padding: 10, color: "white" }}
            containerStyle={{ marginTop: 10 }}
          />

          <Button
            buttonStyle={{ marginTop: 40 }}
            color="#01395c"
            title="Sign In"
            type="outline"
            onPress={() => this.handleSubmit()}
          />

          <View
            style={{
              padding: 40,
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
