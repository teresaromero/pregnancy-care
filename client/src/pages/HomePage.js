import React from "react";
import cx from "classnames";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginAct, signupAct, clearMessages } from "../lib/redux/actions";

class _HomePage extends React.Component {
  render() {
    let { loginActive, signupActive, dispatch } = this.props;
    let loginTabClass = cx({ "is-active": loginActive });
    let signupTabClass = cx({ "is-active": signupActive });
    return (
      <div className="section has-text-centered	">
        <img
          src="https://res.cloudinary.com/dpid82d4m/image/upload/v1550654923/Logo.png"
          alt="logo"
        />

        <div className="columns is-marginless is-paddingless">
          <div className="column" />
          <div className="column is-half is-centered has-background-light	">
            <div className="tabs is-centered is-toggle">
              <ul>
                <li
                  className={loginTabClass}
                  onClick={() => {dispatch(loginAct());dispatch(clearMessages())}}
                >
                  <Link to="">Login</Link>
                </li>
                <li
                  className={signupTabClass}
                  onClick={() => {dispatch(signupAct());dispatch(clearMessages())}}
                >
                  <Link to="">Signup</Link>
                </li>
              </ul>
            </div>

            {loginActive ? <LoginForm /> : <SignupForm />}
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

export const HomePage = connect(store => ({
  loginActive: store.loginActive,
  signupActive: store.signupActive
}))(withRouter(_HomePage));
