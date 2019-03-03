import React from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class _HomePage extends React.Component {
  render() {
    let { loginActive } = this.props;
    
    return (
      <section
        class="hero is-primary is-fullheight"
        style={{ marginTop: "-3rem", marginBottom: "-3rem" }}
      >
        <div class="hero-body">
          <div class="content has-text-centered">
            <div class="column is-4 is-offset-4">
              <img
                className="logo"
                src="/images/logo.png"
                alt="logo pregnancy care"
              />
              <div class="box">
                {loginActive ? <LoginForm /> : <SignupForm />}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const HomePage = withRouter(
  connect(store => ({
    loginActive: store.loginActive,
    signupActive: store.signupActive
  }))(_HomePage)
);
