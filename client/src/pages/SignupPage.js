import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { SignupForm } from "../components/SignupForm";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

const _SignUpPage = ({ classes }) => {
  return (
    <main className={classes.main}>
      <SignupForm classes={classes} />
    </main>
  );
};

_SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export const SignUpPage = connect()(
  withRouter(withStyles(styles)(_SignUpPage))
);
