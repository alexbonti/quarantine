import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Card } from "components";
import moment from "moment";


export const NewsCard = props => {
console.log("props", props)
  return (
    <>
      <Grid container style={{ margin: "1vh 0vw" }}>
        <Grid item xs={12}>
          <Card
            style={{
              backgroundColor: "transparent",
              backgroundImage: `url(${props.news.imageURL})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "20vh"
            }}
          ></Card>
        </Grid>
        <Grid item style={{padding: "0 5px"}}>
          <Typography variant="h6">Anim culpa couat dolore qui est eiusmod mollit laborum esse ipsum. </Typography>
        </Grid>
        <Grid item xs={11} style={{padding: "0 5px"}}>
            <Typography variant="caption">
              {moment(props.news.datePublished).format("LT")}
            </Typography>
          </Grid>
      </Grid>
    </>
  );
};
