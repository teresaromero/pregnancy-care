import React from "react";
import cx from "classnames";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      loginActive: false,
      signupActive: true
    };
  }
  render() {
    let { loginActive, signupActive } = this.state;
    let loginTabClass = cx({ "is-active": loginActive });
    let signupTabClass = cx({ "is-active": signupActive });
    return (
      <React.Fragment>
        <div className="section is-large">
          <div className="section">
            <div className="tabs is-centered">
              <ul>
                <li
                  className={loginTabClass}
                  onClick={() =>
                    this.setState({
                      loginActive: true,
                      signupActive: false
                    })
                  }
                >
                  <a>Login</a>
                </li>
                <li
                  className={signupTabClass}
                  onClick={() =>
                    this.setState({
                      signupActive: true,
                      loginActive: false
                    })
                  }
                >
                  <a>Signup</a>
                </li>
              </ul>
            </div>

            {loginActive ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
