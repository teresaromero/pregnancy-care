import React from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

export const HomePage = () => {
  return (
    <React.Fragment>
      <div id="homepage" className="section">
        <div className="container">
          <div className="box">
            <div className="section">
              <p className="title">Pregnancy Care</p>
              <p className="subtitle">Handle all your patient information</p>
            </div>
            <div className="section">
              <div className="tabs is-centered">
                <ul>
                  <li className="is-active">
                    <a>Login</a>
                  </li>
                  <li>
                    <a>Signup</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <LoginForm />
              </div>
              <div className="column">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
