import React, { useEffect, useContext, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Heading, NewsMediumCard, NewsCard } from "components";
import { API } from "helpers/index";
import moment from "moment";
import { NewsLargeCard } from "components/index";

export const Home = () => {
  const [news, setNews] = useState([]);
  console.log("Home -> news", news);

  useEffect(() => {
    const callApi = async () => {
      let data = {
        category: "NEWS",
        numberOfRecords: 10
      };
      const newsData = await API.getNews(data);
      if (newsData) {
        setNews(newsData.response.data.data.data);
      }
    };
    callApi();
  }, []);

  return news !== undefined && news.length > 0 ? (
    <>
      <Grid
        container
        justify="center"
        style={{padding: "2vh  3vw"}}
      >
        <Grid  item xs={12} md={7} container >
          {/* <Grid item xs={11} >
            <Heading title="News" color="red" />
          </Grid> */}
          <Grid item xs={11}>
            <Typography variant="h5">{moment().format("LLL")}</Typography>
          </Grid>
          <Grid item xs={12} style={{ borderBottom: "1px solid rgba(220, 220, 220, 0.39)" }}>
            <Typography variant="h6">Latest NEWS</Typography>
          </Grid>
        <Grid container alignItems="center" >
          <Grid
            item
            xs={12}
            component={Link}
            to={{
              pathname: "/news",
              state: { news: news[0] }
            }}
            style={{ textDecoration: "none" }}
          >
            <NewsLargeCard news={news[0]} />
          </Grid>
        </Grid>
        <Grid container alignItems="center"  justify="space-between">
          {news.map((news, key) =>
            key > 0 && key < 3 ? (
              <Grid
                item
                xs={5}
                md={5}
                lg={5}
                key={key}
                component={Link}
                to={{
                  pathname: "/news",
                  state: {  news }
                }}
                style={{ textDecoration: "none" }}
              >
                <NewsCard news={news} />
              </Grid>
            ) : key > 0 ? (
              <Grid
              container
              justify="center"
                item
                xs={12}
                md={5}
                lg={5}
                key={key}
                component={Link}
                to={{
                  pathname: "/news",
                  state: { news}
                }}
                style={{ textDecoration: "none" }}
              >
                <NewsMediumCard news={news} />
              </Grid>
            ) : (
              ""
            )
          )}
        </Grid>
      </Grid>
      </Grid>
    </>
  ) : (
    "Loading"
  );
};
