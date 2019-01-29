import React from "react";
import { Input } from "./Input";
import AuthApi from "../lib/authApi";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, login, clearMessages } from "../lib/redux/actions";

class _LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleLogin() {
    const { email, password } = this.state;
    const { history, dispatch } = this.props;

    AuthApi.login(email, password)
      .then(user => {
        dispatch(clearMessages());
        dispatch(login(user));
        history.goBack();
      })
      .catch(e => {
        dispatch(errorMessageAction("Invalid credentials"));
      });
  }
  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <div className="section">
          <Input
            name="email"
            title="Email"
            inputtype="email"
            value={email}
            placeholder="Enter a valid email"
            handleChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            name="password"
            title="Password"
            inputtype="password"
            value={password}
            placeholder="Enter a password"
            handleChange={e => this.setState({ password: e.target.value })}
          />

          <div className="section">
            <button
              className="button is-info"
              onClick={() => this.handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const LoginForm = connect()(withRouter(_LoginForm));
