import React, { Component } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";

export default class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Switch location={location}>
              <Route exact strict path="/" component={HomePage} key="homepage" />
            </Switch>
          </div>
        )}
      />
    );
  }
}
