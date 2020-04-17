import React, { useEffect, useState,useContext} from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Heading, NewsMediumCard, NewsCard } from "components";
import { LayoutConfig } from "configurations";
import {NewsBox} from "components"
import { API } from "helpers/index";
import { LoginContext } from "contexts";

import moment from "moment";
import { NewsLargeCard, LoadingScreen, GridContainer } from "components/index";
import { RegularButton } from "components";
import Button from '@material-ui/core/Button';


import lapd_logo from "assets/img/lpad-logo.png";
import help from "assets/img/help.png";
const padding=15;

export const Home = () => {
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState({});
  const [ads,setAds]=useState({});
  const { loginStatus } = useContext(LoginContext);

  //console.log("Home -> stats", stats);
  console.log("Home -> ads", ads.length);

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
      const getStatsData = await API.getStats();
      const getAds = await API.getAds({
        type: "NEED",
        category: "",
        numberOfRecords: 100,
        currentPageNumber: 1
      },
      setAds);
     

      if (getStatsData) {
        setStats(getStatsData.data.data);
      }
    };
    callApi();
  }, []);
  
  // {
  //   "statusCode": 200,
  //   "message": "Success",
  //   "data": {
  //     "totalCases": "5,314",
  //     "newCases": 0,
  //     "totalDeaths": "28 ",
  //     "newDeaths": "+3",
  //     "totalRecovered": "585",
  //     "activeCases": "4,701"
  //   }
  // }
  return news !== undefined && news.length > 0 && stats !== undefined ? (
    <>
      <Grid container justify="center" style={{ padding: "0 0vw" }}>
        <Grid item xs={12} md={12} container style={{ paddingTop: 0 }}>
        {/*<Grid
              item
              container
              xs={12}
              justify="center"
              style={{ height:50,padding: "0", backgroundColor: LayoutConfig.theme.colors.color5}}
            >
              <Grid item container xs={12} justify="space-evenly">
              <Grid item xs={4} align="center">
                  <Typography variant="h5" style={{color: "white"}}>Active Cases</Typography>
                  <Typography variant="h5" style={{ fontSize: 20 }}>
                    {stats.activeCases}
                  </Typography>
                </Grid>
                <Grid item xs={4} align="center">
                  <Typography variant="h6" style={{color: "white"}}>New Cases</Typography>
                  <Typography variant="h5" style={{ fontSize: 20 }}>
                    {stats.newCases}
                  </Typography>
                </Grid>
                <Grid item xs={4} align="center">
                  <Typography variant="h6" style={{color: "white"}}>New Deaths</Typography>
                  <Typography variant="h5" style={{ fontSize: 20 }}>
                    {stats.newDeaths}
                  </Typography>
                </Grid>
               
              </Grid>
            </Grid>*/}
          <Grid item xs={12} style={{height:260,backgroundColor:LayoutConfig.theme.colors.color5, paddingLeft:padding,paddingRight:padding,paddingTop:30,paddingBottom:30}}>
            <Grid item xs={12} style={{height:200}}>
              <Grid item xs={12}>
                <Typography variant="h5" align="left" style={{color:'white', fontSize:20,fontWeight:'bold'}}>
                WE SUPPORT
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="left" style={{fontSize:28}}>
                  Locals helping Locals
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="left" style={{color:'white',fontSize:22}}>
                  We are #DistantButTogether
                </Typography>
              </Grid>

              <Grid item xs={12} style={{paddingTop:40}} align='center'>
              <Link to="/locals"><Button size='large'  variant="contained"  style={{backgroundColor:LayoutConfig.theme.colors.color4,width:250,height:50,fontSize:22, color:'white'}}>NEED HELP?</Button></Link>


            </Grid>
            </Grid>
           
           
           
           
            
          </Grid>
          {/* <Grid item xs={12} style={{ borderBottom: "1px solid rgba(220, 220, 220, 0.39)" }}>
            <Typography variant="h6">Latest NEWS</Typography>
          </Grid> */}
          
          
          <Grid container xs={12} style={{paddingTop:30,paddingBottom:30, backgroundColor:LayoutConfig.theme.colors.primary,height:260}}>
            <Grid container style={{height:120}}>
              <Grid item xs={8} style={{paddingLeft:padding}}>
              
                <Typography variant="h5" align="left" style={{fontSize:30}}>
                  Can you help?
                  
                </Typography>
                <Typography variant="h5" align="left" style={{fontSize:24,color:LayoutConfig.theme.colors.color5}}>
                  We all need a extra hand today.

                </Typography>
              </Grid>
              <Grid item xs={4} align='center' >
                <img src={help} width='70%'></img> 
              </Grid>
            </Grid>
            
              <Grid item xs={12} style={{height:25,paddingLeft:padding}} align='center'>
              {
                ads.length>0?(<Typography variant="h5" align="left" style={{fontSize:22}}>
                {ads.length} people need help in your area.

              </Typography>):null
              }
              </Grid>
              <Grid item xs={12} style={{paddingTop:5}} align='center'>
                
              {
              !loginStatus ? (<Link to="/locals"><Button size='large'  variant="contained" color='secondary'  style={{width:250,height:50,fontSize:22, backgroundColor:LayoutConfig.theme.colors.color5}}>Start helping</Button></Link>
              ):(<Link to="/locals"><Button size='large'  variant="contained" color='secondary'  style={{width:250,height:50,fontSize:22, backgroundColor:LayoutConfig.theme.colors.color5}}>Start helping</Button></Link>)}
            </Grid>
          </Grid>
          

          
          <Grid xs={12} container alignItems="center" style={{paddingLeft:padding,paddingRight:padding}}>
          {news.map((news, key) =>(
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={5}
                  key={key}
                  component={Link}
                  to={{
                    pathname: "/news",
                    state: { news }
                  }}
                  style={{ textDecoration: "none",marginTop:20 }}
                >
 <NewsBox news={news} />                </Grid>
              ))}
            {/*<Grid
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
            </Grid>*/}
          </Grid>
          {/*<Grid container alignItems="center" justify="space-between">
            {news.map((news, key) =>
              key > 0 && key < 3 ? (
                <Grid
                  item
                  xs={10}
                  md={12}
                  lg={12}
                  key={key}
                  component={Link}
                  to={{
                    pathname: "/news",
                    state: { news }
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
                  md={12}
                  lg={12}
                  key={key}
                  component={Link}
                  to={{
                    pathname: "/news",
                    state: { news }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <NewsMediumCard news={news} />
                </Grid>
              ) : (
                ""
              )
            )}
          </Grid>*/}
        </Grid>
      </Grid>
    </>
  ) : (
    <LoadingScreen loadingText="loading" />
  );
};
