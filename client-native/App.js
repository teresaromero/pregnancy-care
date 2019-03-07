import React from "react";
import { createRootNavigator } from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { ActivityIndicator } from "react-native";
import { Font } from "expo";
import { graphql } from "react-apollo";
import { branch, renderComponent } from "recompose";
import { currentUserApp } from "./lib/graphQL/queries";

const enhance = branch(
  ({ currentUserApp }) => currentUserApp.loading,
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
    const { currentUser } = this.props.currentUserApp;
    if (currentUser) {
      this.setState({ isAuth: true });
    }

  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.currentUserApp) !==
      JSON.stringify(nextProps.currentUserApp)
    ) {
      this.setState({ isAuth: true });
    }
  }

  render() {
    let { isAuth } = this.state;
    const Layout = createAppContainer(createRootNavigator(isAuth));
    return <Layout />;
  }
}

export default graphql(currentUserApp, { name: "currentUserApp" })(
  enhance(App)
);
