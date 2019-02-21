import React from "react";
import AuthApi from "../lib/APIs/authApi";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  errorMessageAction,
  login,
  clearMessages,
  signupAct
} from "../lib/redux/actions";
import { InputP } from "./InputP";
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

    if (email === "" || password === "") {
      dispatch(errorMessageAction("Please enter email and password"));
      return;
    }

    AuthApi.login(email, password)
      .then(user => {
        dispatch(clearMessages());
        dispatch(login(user));
        history.push("/admin");
      })
      .catch(e => {
        dispatch(errorMessageAction("Invalid credentials"));
      });
  }

  render() {
    let { email, password } = this.state;
    let { messages, dispatch } = this.props;
    return (
      <React.Fragment>
        <div className="section">
          <InputP
            id="email-login"
            name="email"
            label="Email"
            value={email}
            type="email"
            placeholder=""
            handleChange={e => this.setState({ email: e.target.value })}
          />
          <InputP
            id="password-login"
            name="password"
            label="Password"
            value={password}
            type="password"
            placeholder=""
            handleChange={e => this.setState({ password: e.target.value })}
          />
          <button
            className="button is-info is-outlined"
            onClick={e => this.handleSubmit(e)}
          >
            Login
          </button>
        </div>
        <div className="section is-paddingless">
          <p className="help">
            If you don't have an account please{" "}
            <Link
              to=""
              onClick={() => {
                dispatch(signupAct());
                dispatch(clearMessages());
              }}
            >
              Signup.
            </Link>
          </p>
        </div>
        <div className="section has-text-centered is-paddingless">
          <p className="help has-text-danger">{messages}</p>
        </div>
      </React.Fragment>
    );
  }
}

export const LoginForm = connect(store => ({ messages: store.messages }))(
  withRouter(_LoginForm)
);
