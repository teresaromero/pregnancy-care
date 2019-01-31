import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import AuthApi from "../lib/authApi";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessageAction, login, clearMessages } from "../lib/redux/actions";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class _SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, surname, email, password } = this.state;
    const { history, dispatch, location } = this.props;
    if (!e.target.checkValidity()) {
      return;
    }

    AuthApi.signup(name, surname, email, password)
      .then(user => {
        dispatch(clearMessages());
        dispatch(login(user));
        location.state ? history.goBack() : history.push("/");
      })
      .catch(e => {
        dispatch(errorMessageAction("Invalid credentials"));
      });
  }

  render() {
    let { name, surname, email, password } = this.state;
    let { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          method="POST"
          onSubmit={e => this.handleSubmit(e)}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="surname">Surname</InputLabel>
            <Input
              id="surname"
              name="surname"
              autoComplete="surname"
              autoFocus
              value={surname}
              onChange={e => this.setState({ surname: e.target.value })}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="signup-email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="signup-password"
              autoComplete="current-password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SignUp
          </Button>
        </form>
        <Typography variant="overline" gutterBottom>
          If you have an account login
          <Link component={RouterLink} to="/login">
            here
          </Link>
        </Typography>
      </Paper>
    );
  }
}

_SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export const SignupForm = connect()(
  withRouter(withStyles(styles)(_SignupForm))
);
