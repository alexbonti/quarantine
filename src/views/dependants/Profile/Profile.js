import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { API } from "helpers/index";
import { CardBody, Card, CardFooter } from "components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CardHeader } from "components/index";

const Profile = props => {
  const [profile, setProfile] = useState({});
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const triggerApi = async () => {
      const data = {
        category: "",
        numberOfRecords: 100,
        currentPageNumber: 1
      };
      const profileDataResp = await API.getProfile();
      if (profileDataResp) {
        setProfile(profileDataResp);
      }
      await API.getAds(data, setListing);
    };
    triggerApi();
  }, []);

  return profile.firstName !== undefined && listing !== undefined ? (
    <Grid container justify="center" style={{ padding: "5vh 1vw" }}>
      <Grid item xs={11} style={{ padding: "5vh  0" }}>
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
      <Grid item xs={12}>
        <hr style={{ border: ".5px solid grey" }} />
      </Grid>

      <Grid item xs={11} container>
        <Typography variant="h5">Offers</Typography>
        {listing.map((item, key) => {
          return item.postType === "NEED" ? (
            <Grid item xs={12} key={key}>
              <Card style={{ background: "#4c586a", marginBottom: "1vh" }}>
                <CardBody>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="h6">{item.title}</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                      <DeleteForeverIcon />
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          ) : (
            ""
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <hr style={{ border: ".5px solid grey" }} />
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h5">Need</Typography>
        {listing.map((item, key) => {
          return item.postType === "OFFER" ? (
            <Grid item xs={12} key={key}>
              <Card style={{ background: "#4c586a", marginBottom: "1vh" }}>
                <CardBody>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="h6">{item.title}</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                      <DeleteForeverIcon />
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          ) : (
            ""
          );
        })}
      </Grid>
    </Grid>
  ) : (
    ""
  );
};

export default withRouter(Profile);
