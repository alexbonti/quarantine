import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Card, CardBody } from "components";

export const NewsLargeCard = props => {
  return (
    <>
      <Grid container justify="center">

        <Grid item xs={12}>
          <Card
            style={{
              margin: "1vh 0",
              backgroundColor: "transparent",
              backgroundImage: `url(${props.news.imageURL})`,
              height: "30vh",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          >
            <CardBody>
              <Grid
                container
                justify="space-between"
                alignItems="center"
              ></Grid>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={12} style={{padding: "0 5px"}}>
            <Typography variant="h5" >
                Id tempor aliquip dolor elit officia veniam. Nisi esse magna magna quis in est. 
            </Typography>
        </Grid>
      </Grid>
    </>
  );
};
