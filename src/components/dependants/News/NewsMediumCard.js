import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Card } from "components";
import moment from "moment";

export const NewsMediumCard = props => {
  console.log("props", props);
  return (
    <>
      <Grid container style={{ margin: "1vh 0vw", overflow: "hidden", maxHeight: "125px"}} justify="space-between">
        <Grid item xs={8} container>
          <Grid item xs={11} >
            <Typography variant="h6">
              Anim culpa couat dolore qui est eiusmod mollit laborum esse ipsum.loremLaboris voluptate commodo ex Irure ipsum officia deserunt fugiat.{" "}
            </Typography>
          </Grid>
          <Grid item xs={11} style={{alignSelf: "center"}}>
            <Typography variant="caption">
              {moment(props.news.datePublished).format("LT")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card
            style={{
              backgroundColor: "transparent",
              backgroundImage: `url(${props.news.imageURL})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "20vh"
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
