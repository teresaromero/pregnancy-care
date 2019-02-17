import React from "react";
import { createRootNavigator } from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { Provider, connect } from "react-redux";
import { store } from "./lib/redux/store";
import { isSignedIn } from "./auth/auth";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(e => alert("An error occurred"));
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

export default App;
