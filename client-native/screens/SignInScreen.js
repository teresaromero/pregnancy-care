import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { Card, Button, Input, Text, Image } from "react-native-elements";
import AuthApi from "../lib/APIs/authApi";
import { login, errorMessageAction, clearMessages } from "../lib/redux/actions";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { currentUserApp } from "../lib/graphQL/queries";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleSubmit() {
    let { navigation, login } = this.props;
    let { email, password } = this.state;

    if (email === "" || password === "") {
      this.setState({ error: "Please enter all information" });
    } else {
      login(email, password)
        .then(({ data }) => {
          navigation.navigate("SignedIn");
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    console.log(this.props);
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
            titleStyle={{ color: "white", paddingRight: 15 }}
            type="clear"
            onPress={() => this.handleSubmit()}
          />

          <View
            style={{
              padding: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "red" }}>{this.state.error}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default graphql(
  gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        name
        email
      }
    }
  `,
  {
    options: { refetchQueries: ['currentUser'] },
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } })
    })
  }
)(SignIn);
