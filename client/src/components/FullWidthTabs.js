import React from "react";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TabContainer } from "./TabContainer";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600
  }
}));

class _FullWidthTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  handleChangeIndex(index) {}

  render() {
    const classes = useStyles;
    const theme = useTheme;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="relative" color="default">
          <Tabs
            value={value}
            onChange={(e, nv) => this.handleChange(e, nv)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabContainer dir={theme.direction}>
            <LoginForm />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <SignupForm />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export const FullWidthTabs = connect()(withRouter(_FullWidthTabs));


