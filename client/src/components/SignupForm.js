import React from "react";
import AuthApi from "../lib/APIs/authApi";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  errorMessageAction,
  login,
  clearMessages,
  loginAct
} from "../lib/redux/actions";

import { InputP } from "./InputP";

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

    if (name === "" || surname === "" || email === "" || password === "") {
      dispatch(errorMessageAction("Please enter all the fields"));
      return;
    }

    AuthApi.signup(name, surname, email, password)
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
    let { name, surname, email, password } = this.state;
    let { dispatch, messages } = this.props;
    return (
      <React.Fragment>
        <InputP
          id="name-signup"
          name="name"
          value={name}
          label="Name"
          type="text"
          placeholder=""
          handleChange={e => this.setState({ name: e.target.value })}
        />

        <InputP
          id="surname-signup"
          name="surname"
          value={surname}
          label="Surname"
          type="text"
          placeholder=""
          handleChange={e => this.setState({ surname: e.target.value })}
        />

        <InputP
          id="email-signup"
          name="email"
          value={email}
          label="Email"
          type="email"
          placeholder=""
          handleChange={e => this.setState({ email: e.target.value })}
        />
        <InputP
          id="password-signup"
          name="password"
          value={password}
          label="Password"
          type="password"
          placeholder=""
          handleChange={e => this.setState({ password: e.target.value })}
        />

        <button
          className="button is-primary is-outlined"
          onClick={e => this.handleSubmit(e)}
        >
          Signup
        </button>

        <p className="help has-text-grey">
          If you already have an account please{" "}
          <Link
            to=""
            onClick={() => {
              dispatch(loginAct());
              dispatch(clearMessages());
            }}
          >
            Login.
          </Link>
        </p>

        <div className="section has-text-centered is-paddingless">
          <p className="help has-text-danger">{messages}</p>
        </div>
      </React.Fragment>
    );
  }
}

export const SignupForm = withRouter(
  connect(store => ({ messages: store.messages }))(_SignupForm)
);
