import React from "react";
import AuthApi from "../lib/authApi";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, login, clearMessages } from "../lib/redux/actions";

import { InputDiv } from "./InputDiv";
class _LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { history, dispatch } = this.props;

    AuthApi.login(email, password)
      .then(user => {
        dispatch(clearMessages());
        dispatch(login(user));
        history.push("/dashboard");
      })
      .catch(e => {
        dispatch(errorMessageAction("Invalid credentials"));
      });
  }

  render() {
    let { email, password } = this.state;
    return (
      <form method="POST" onSubmit={e => this.handleSubmit(e)}>
        <InputDiv
          id="email-login"
          name="email"
          label="Email"
          value={email}
          type="email"
          placeholder=""
          handleChange={e => this.setState({ email: e.target.value })}
        />
        <InputDiv
          id="password-login"
          name="password"
          label="Password"
          value={password}
          type="password"
          placeholder=""
          handleChange={e => this.setState({ password: e.target.value })}
        />
        <button type="submit" className="button is-info">
          Login
        </button>
      </form>
    );
  }
}

export const LoginForm = connect()(withRouter(_LoginForm));
