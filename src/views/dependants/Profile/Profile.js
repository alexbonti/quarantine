import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { API } from "helpers/index";
import { logout } from "contexts/helpers";
import { CardBody, Card } from "components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { dataTable } from "variables/general";

const Profile = props => {
  const [profile, setProfile] = useState({});
  const [needs, setNeeds] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const triggerApi = async () => {
      const profileDataResp = await API.getProfile();
      if (profileDataResp) {
        setProfile(profileDataResp);
      }
      const listingsDataResp = await API.getPersonalAds();
      if (listingsDataResp) {
        listingsDataResp.map(list => {
          if (list._id === "OFFER") {
            setOffers(list.listings);
          } else if (list._id === "NEED") {
            setNeeds(list.listings);
          }
        });
      }
    };
    triggerApi();
  }, []);

  return profile.firstName !== undefined && offers !== undefined ? (
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
        <Button variant="contained" color="primary" onClick={() => { logout(); }} style={{ marginTop: '10px' }} >Logout</Button>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ border: ".5px solid grey" }} />
      </Grid>

      <Grid item xs={11} container>
        <Grid item xs={12}>
          <Typography variant="h5">Offers</Typography>
        </Grid>
        {offers.map((item, key) => {
          return (
            <Grid
              item
              xs={12}
              md={5}
              lg={3}
              key={key}
              style={{ margin: "1vh " }}
            >
              <Card>
                <CardBody>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid
                      item
                      xs={8}
                      component={Link}
                      to={{ pathname: "/adv", state: item }}
                    >
                      <Typography variant="h6">{item.title}</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                      <DeleteForeverIcon />
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <hr style={{ border: ".5px solid grey" }} />
      </Grid>
      <Grid item xs={11}>
        <Grid item xs={12}>
          <Typography variant="h5">Need</Typography>
        </Grid>
        {needs.map((item, key) => {
          return (
            <Grid
              item
              xs={12}
              md={5}
              lg={3}
              key={key}
              style={{ margin: "1vh " }}
            >
              <Card>
                <CardBody>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid
                      item
                      xs={8}
                      component={Link}
                      to={{ pathname: "/adv", state: item }}
                    >
                      <Typography variant="h6">{item.title}</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                      <DeleteForeverIcon />
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  ) : (
      ""
    );
};

export default withRouter(Profile);
