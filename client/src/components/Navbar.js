import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { toggle } from "../lib/redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));
const _Navbar = ({ dispatch, sideNav }) => {
  const classes = useStyles;
  const theme = useTheme;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: sideNav
        })}
      >
        <Toolbar disableGutters={sideNav}>
          
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <NavLink to="/">Pregnancy Care</NavLink>
          </Typography>
          <Button component={NavLink} to="/signup" color="inherit">
            Signup
          </Button>
          <Button component={NavLink} to="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

_Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export const Navbar = connect(store => ({
  user: store.user,
  sideNav: store.sideNav
}))(withRouter(_Navbar));
