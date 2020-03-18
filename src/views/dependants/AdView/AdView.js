import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Card, CardHeader, CardBody, CardFooter, Heading } from "components";
import { FourOFour } from "views/common/FourOFour/FourOFour";
import { RegularButton } from "components/index";

const interestPeopleData = [
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Carlos",
    lastName: "Zampa",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Carlos",
    lastName: "Zampa",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Carlos",
    lastName: "Zampa",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Carlos",
    lastName: "Zampa",
    phoneNumber: "+67133212"
  }
];

const AdView = props => {
  console.log("props", props);
  if (props.location.state === undefined) {
    return <FourOFour />;
  }

  const { category, description, status, title } = props.location.state;
  return (
    <Grid
      container
      justify="center"
      style={{ padding: "5vh 0"}}
    >
      <Grid item xs={11} md={6} lg={4}>
        <Card>
          <CardHeader>
            <Typography variant="caption">{category}</Typography>

            <Typography
              style={status === "AVAILABLE" ? { color: "green" } : ""}
            >
              {status}
            </Typography>
            <Typography variant="h5">{title}</Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="caption">
              Dolore dolor commodo voluptate ut aliquip. Deserunt excepteur nisi
              deserunt elit deserunt nulla incididunt irure deserunt est ea
              Lorem cupidatat. Ea tempor proident tempor consequat ut non irure
              minim reprehenderit.
            </Typography>
          </CardBody>
          <CardFooter>
            <Grid item align="center" xs={12}>
              <RegularButton color="primary">
                {" "}
                Transaction Completed
              </RegularButton>
            </Grid>
          </CardFooter>
        </Card>
      </Grid>
      <Grid container justify="center">
        {interestPeopleData.map((person, key) => {
          return (
            <Grid key={key} item xs={11} md={6} lg={4}>
              <Typography variant="body1">{person.firstName}{" "}{person.lastName}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default withRouter(AdView);
