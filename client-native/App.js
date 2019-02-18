import React from "react";
import { registerRootComponent } from "expo";
import { createRootNavigator } from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { Provider, connect } from "react-redux";
import { store } from "./lib/redux/store";
import { isSignedIn } from "./auth/auth";
import AuthApi from "./lib/APIs/authApi";
import { login } from "./lib/redux/actions";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    AuthApi.currentUser()
      .then(user => {
       
        if (user !== undefined || user !== null) {
          store.dispatch(login(user));
          this.setState({ signedIn: true, checkedSignIn: true });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createAppContainer(createRootNavigator(signedIn));
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

registerRootComponent(App);
