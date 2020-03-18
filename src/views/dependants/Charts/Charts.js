/*eslint-disable*/
import React, { useState, useEffect } from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {Chart} from "components"
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

import moment from "moment";

// core components
import {
  Heading,
  Card,
  CardHeader,
  CardIcon,
  CardBody,
  CardFooter,
  GridContainer,
  GridItem
} from "components";



import styles from "../../../assets/jss/projectJss/views/chartsStyle";

import { withRouter } from "react-router-dom";
import { API } from "helpers/index";

const useStyles = makeStyles(styles);

const Charts = () => {
  const classes = useStyles();
  const [stats, setStats] = useState([]);
  const [statsNewCases, setStatsNewCases] = useState([])
  console.log("Charts -> statsNewCases", statsNewCases)
  const [statsTotalCases, setStatsTotalCases] = useState([])

  useEffect(() => {
    const triggerAPI = async () => {
      const statsDataRes = await API.getStats();
      if (statsDataRes) {
        let seriesTotDeaths = [];
        let labelsTotDeaths = [];
        let seriesNewCases = [];
        let labelsNewCases = [];
        let seriesTotalCases= [];
        let labelsTotalCases = [];
        statsDataRes.dataStats.map(value => {
          labelsTotDeaths.push(moment(value.date).format("D/M"));
          seriesTotDeaths.push(Number(value.totalDeaths));
          seriesNewCases.push(Number(value.newCases))
          labelsNewCases.push(moment(value.date).format("D/M"));
          seriesTotalCases.push(Number(value.totalCases))
          labelsTotalCases.push(moment(value.date).format("D/M "));
        });
        setStats({ labels: labelsTotDeaths, series: [seriesTotDeaths] });
        setStatsNewCases([seriesNewCases])
        setStatsTotalCases([seriesTotalCases])
      }
    };
    triggerAPI();
  }, []);

  return stats !== undefined  ? (
    <Grid container justify="center" >
      <Grid item xs={10}>
      <Heading title={moment().format("LL")} color="snow"/>
        <GridContainer style={{ padding: "10vh 1vw" }}>
          <GridItem xs={12} sm={12} >
            <Card chart>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}> </h4>
              </CardHeader>
              <CardBody>
                <Chart data={{stats,statsNewCases,statsTotalCases}} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        
      </Grid>
    </Grid>
  ) : ""
};

export default withRouter(Charts);
