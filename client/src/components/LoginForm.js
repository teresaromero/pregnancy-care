import React from "react";
import { Input } from "./Input";


export const LoginForm = () => {
  return (
    <React.Fragment>
      <Input
        name="username"
        title="Username"
        inputtype="text"
        value=""
        placeholder="Enter a username"
      />
      <Input
        name="email"
        title="Email"
        inputtype="email"
        value=""
        placeholder="Enter a valid email"
      />
      <Input
        name="password"
        title="Password"
        inputtype="password"
        value=""
        placeholder="Enter a password"
      />

      <label className="checkbox">
        <input type="checkbox" />I agree to the{" "}
        <a href="#">terms and conditions</a>
      </label>
      <div className="section">
        <button className="button is-info">Signup</button>
      </div>

      <div className="section">
        <p>Already a member? Login</p>
      </div>
    </React.Fragment>
  );
};
