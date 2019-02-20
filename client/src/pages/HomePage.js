import React from "react";
import cx from "classnames";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { Link } from "react-router-dom";

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
      <div className="section has-text-centered	">
        <div className="section is-large">
          <img
            src="https://res.cloudinary.com/dpid82d4m/image/upload/v1550654923/Logo.png"
            alt="logo"
          />
        </div>

        <div className="columns is-marginless is-paddingless">
          <div className="column" />
          <div className="column is-half is-centered has-background-light	">
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
                  <Link to="">Login</Link>
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
