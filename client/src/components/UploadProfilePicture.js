import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Icon } from "@material-ui/core";

const styles = theme => ({
  fab: {
    position: "relative",
    left: "69px",
    top: " -48px",
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  }
});

class _UploadProfilePicture extends React.Component {
  constructor(){
    super();
    this.state={
      selectedFile:null,
      loaded:0
    }
  }
  selectFile(e) {
    this.setState({selectFile:e.target.files[0]},()=>{
      
    })
  }

  render() {
    let { classes, user } = this.props;
    console.log(user);
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          {user ? (
            <React.Fragment>
              <Avatar alt="Profile Picture" className={classes.bigAvatar}/>
              <input
                accept="image/*"
                className={classes.input}
                id="profile-picture"
                type="file"
                onChange={e => this.selectFile(e)}
              />
              <Fab
                color="secondary"
                aria-label="edit"
                component="label"
                className={classes.fab}
                size="small"
                htmlFor="profile-picture"
              >
                <Icon>edit_icon</Icon>
              </Fab>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Avatar alt="Profile Picture" className={classes.bigAvatar}>
                <AccountCircleIcon fontSize="large" />
              </Avatar>
              <input
                accept="image/*"
                className={classes.input}
                id="profile-picture"
                type="file"
                onChange={e => this.handleInput(e)}
              />
              <Fab
                color="primary"
                aria-label="Add"
                component="label"
                className={classes.fab}
                size="small"
                htmlFor="profile-picture"
              >
                <AddIcon />
              </Fab>{" "}
            </React.Fragment>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export const UploadProfilePicture = connect(store => ({ user: store.user }))(
  withRouter(withStyles(styles)(_UploadProfilePicture))
);
