import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { API } from "helpers/index";
import { CardBody, Card } from "components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Profile = props => {
  const [profile, setProfile] = useState({});
  const [listings, setListings] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [offers, setOffers] = useState([]);
  console.log("offers", offers)

  useEffect(() => {
    const triggerApi = async () => {
      const profileDataResp = await API.getProfile();
      if (profileDataResp) {
        setProfile(profileDataResp);
      }
      const listingsDataResp = await API.getPersonalAds();
      if (listingsDataResp) {
        console.log("triggerApi -> listingsDataResp", listingsDataResp)
        setOffers(listingsDataResp[0].listings);
        setNeeds(listingsDataResp[1].listings);
      }
    };
    triggerApi();
  }, []);

  return profile.firstName !== undefined && listings !== undefined ? (
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
        {offers.map((item, key) => {
          return (<Grid item xs={12} key={key}>
            <Card style={{  marginBottom: "1vh" }}>
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
          </Grid>)
        })}
      </Grid>
      <Grid item xs={12}>
        <hr style={{ border: ".5px solid grey" }} />
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h5">Need</Typography>
        {needs.map((item, key) => {
          return (<Grid item xs={12} key={key}>
            <Card style={{  marginBottom: "1vh" }}>
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
          </Grid>)
        })}
      </Grid>
    </Grid>
  ) : (
    ""
  );
};

export default withRouter(Profile);
