import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Heading, NewsMediumCard, NewsCard } from "components";
import { API } from "helpers/index";
import moment from "moment";
import { NewsLargeCard, LoadingScreen } from "components/index";
import lapd_logo from 'assets/img/lpad-logo.png'

export const Home = () => {
  const [news, setNews] = useState([]);

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
        style={{padding: "0 3vw"}}
      >
       
        <Grid  item xs={12} md={7} container style={{paddingTop: "2vh "}}>
     
    
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid item xs={12}>
              <Typography variant="h5" align='center'>
              DiTo is a collaborative effort Led by Deakin Launchpad, to create a tool that will help the community face the Covid-19 virus, by providing curated information and tools to help the community. Our plans are bold but we need more help, if you would like to contribute, find the link in the profile page! Ale
             </Typography>
              </Grid>
            
             

       
          
          
            <hr />
            </Grid>
            <br></br>
            <Grid item xs={12}>
            <Typography variant="h5" style={{color:"#5f5e5d",fontSize:"20px"}}> Latest News about COVID-19
          </Typography>
            </Grid>
            
            
          </Grid>
          {/* <Grid item xs={12} style={{ borderBottom: "1px solid rgba(220, 220, 220, 0.39)" }}>
            <Typography variant="h6">Latest NEWS</Typography>
          </Grid> */}
          
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
  ) : <LoadingScreen loadingText="loading"/>;
};
