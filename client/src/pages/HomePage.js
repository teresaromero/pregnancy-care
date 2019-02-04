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
        <div id="homepage" className="section">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="box">
                <div className="section">
                  <p className="title">Pregnancy Care</p>
                  <p className="subtitle">
                    Handle all your patient information
                  </p>
                </div>
                <div className="container">
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
                </div>
                <div className="container">
                  {loginActive ? <LoginForm /> : <SignupForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
