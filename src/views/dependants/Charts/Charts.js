/*eslint-disable*/
import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

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

import { dailySalesChart , roundedLineChart} from "../../../variables/charts";

import styles from "../../../assets/jss/projectJss/views/chartsStyle";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles(styles);

const Charts = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" style={{padding: "3vh 1vw"}}>
      <Grid item xs={10}>
        <Heading title="Chart" />
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Day Count</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer style={{padding: "3vh 1vw"}}>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Day  Recovered </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={roundedLineChart.data}
                  type="Line"
                  options={roundedLineChart.options}
                  listener={roundedLineChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </Grid>
    </Grid>
  );
};

export default withRouter(Charts);
