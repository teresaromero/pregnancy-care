import React from "react";
import { createRootNavigator } from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { store } from "./lib/redux/store";
import { ActivityIndicator } from "react-native";
import { Font } from "expo";
import { graphql } from "react-apollo";
import { branch, renderComponent } from "recompose";
import { currentUserApp } from "./lib/graphQL/queries";

const enhance = branch(
  ({ data }) => data.loading,
  renderComponent(ActivityIndicator)
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
  }

  componentDidMount() {
    Font.loadAsync({
      "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
      "SourceSansPro-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
      "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf")
    });
    const { currentUser } = this.props.data;
    if (currentUser) {
      this.setState({ isAuth: true });
    }
  }

  render() {
    let { isAuth } = this.state;
    console.log(this.props.data)
    const Layout = createAppContainer(createRootNavigator(isAuth));
    return <Layout />;
  }
}

export default graphql(currentUserApp)(enhance(App));
