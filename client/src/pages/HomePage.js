import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FullWidthTabs } from "../components/FullWidthTabs";
import { Grid, Typography } from "@material-ui/core";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

const _HomePage = ({ classes }) => {
  return (
    <Grid
      style={{ height: "100vh" }}
      container
      spacing={24}
      direction="column"
      wrap="nowrap"
      justify="center"
      align="center"
    >
    
      <Grid item xs={12} sm={8}>
        <FullWidthTabs />
      </Grid>
    </Grid>
  );
};

_HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export const HomePage = connect()(withRouter(withStyles(styles)(_HomePage)));
