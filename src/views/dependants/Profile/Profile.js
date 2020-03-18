import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography, Card } from "@material-ui/core";
import { API } from "helpers/index";

const Profile = props => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const triggerApi = async () => {
      const profileDataResp = await API.getProfile();
      if (profileDataResp) {
        setProfile(profileDataResp);
      }
    };

    triggerApi();
  }, []);
  return profile.firstName !== undefined ? (
    <Grid container justify="center" style={{ padding: "5vh 1vw" }}>
      <Grid item xs={11} style={{ padding: "5vh  3vw" }}>
        <Typography variant="h6">
          {" "}
          {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}{" "}
        </Typography>
        <Typography variant="h6">Email: {profile.emailId}</Typography>
        <Typography variant="h6">Location: {profile.suburb}</Typography>
        <Typography variant="h6">
          Phone Number: {profile.countryCode} {profile.phoneNumber}
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <hr style={{border: ".5px solid grey"}}/>
      </Grid>
    </Grid>
  ) : (
    ""
  );
};

export default withRouter(Profile);
