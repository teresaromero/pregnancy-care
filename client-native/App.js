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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      isLoading: true
    };
  }
  componentDidMount() {
    AuthApi.currentUser()
      .then(user => {
        if (user !== undefined) {
          store.dispatch(login(user));
          this.setState({ isAuth: store.getState().isAuth, isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const { isAuth, isLoading } = this.state;
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)

    const Layout = createAppContainer(createRootNavigator(isAuth));
    return (
      <React.Fragment>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Provider store={store}>
            <Layout />
          </Provider>
        )}
      </React.Fragment>
    );
  }
}

registerRootComponent(App);
