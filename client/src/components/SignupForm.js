import React from "react";
import AuthApi from "../lib/authApi";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, login, clearMessages } from "../lib/redux/actions";

import { InputDiv } from "./InputDiv";

class _SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, surname, email, password } = this.state;
    const { history, dispatch } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    AuthApi.signup(name, surname, email, password)
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
    let { name, surname, email, password } = this.state;

    return (
      <div className="section">
        <form method="POST" onSubmit={e => this.handleSubmit(e)}>
          <InputDiv
            id="name-signup"
            name="name"
            value={name}
            label="Name"
            type="text"
            placeholder=""
            handleChange={e => this.setState({ name: e.target.value })}
          />
          <InputDiv
            id="surname-signup"
            name="surname"
            value={surname}
            label="Surname"
            type="text"
            placeholder=""
            handleChange={e => this.setState({ surname: e.target.value })}
          />
          <InputDiv
            id="email-signup"
            name="email"
            value={email}
            label="Email"
            type="email"
            placeholder=""
            handleChange={e => this.setState({ email: e.target.value })}
          />
          <InputDiv
            id="password-signup"
            name="password"
            value={password}
            label="Password"
            type="password"
            placeholder=""
            handleChange={e => this.setState({ password: e.target.value })}
          />

          <button type="submit" className="button is-info">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export const SignupForm = connect()(withRouter(_SignupForm));
