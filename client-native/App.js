import React from "react";
import { registerRootComponent } from "expo";
import { createRootNavigator } from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { Provider, connect } from "react-redux";
import { store } from "./lib/redux/store";
import { isSignedIn } from "./auth/auth";
import AuthApi from "./lib/APIs/authApi";
import { login } from "./lib/redux/actions";
import { ActivityIndicator } from "react-native";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { Font } from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      isLoading: true
    };
  }

  createClient() {
    // Initialize Apollo Client with URL to our server
    return new ApolloClient({
      link: createHttpLink({
        uri: "https://pregnancy-care.herokuapp.com/grapghql",
        credentials: "include"
      }),
      cache: new InMemoryCache()
    });
  }

  componentDidMount() {
    Font.loadAsync({
      "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
      "SourceSansPro-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
      "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf")
    });

    AuthApi.currentUser()
      .then(user => {
        if (user !== undefined) {
          store.dispatch(login(user));
          this.setState({ isAuth: store.getState().isAuth, isLoading: false },()=>console.log(user));
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const { isAuth, isLoading } = this.state;

    const Layout = createAppContainer(createRootNavigator(isAuth));
    return (
      <React.Fragment>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ApolloProvider client={this.createClient()}>
            <Provider store={store}>
              <Layout />
            </Provider>
          </ApolloProvider>
        )}
      </React.Fragment>
    );
  }
}

registerRootComponent(App);
