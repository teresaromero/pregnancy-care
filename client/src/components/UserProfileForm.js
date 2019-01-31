import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import { UploadProfilePicture } from "./UploadProfilePicture";

const styles = theme => ({});

const UserProfileForm = ({ classes }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Complete Profile
      </Typography>
      <Grid container spacing={24}>
        <UploadProfilePicture />

        <Grid item xs={12} sm={6} />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserProfileForm);
