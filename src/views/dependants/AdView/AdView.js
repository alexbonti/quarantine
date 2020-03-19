import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Card, CardHeader, CardBody, CardFooter, Heading } from "components";
import { FourOFour } from "views/common/FourOFour/FourOFour";
import { RegularButton, ExpansionPanelComponent } from "components/index";
import moment from "moment";
import { API } from "helpers/index";

const interestPeopleData = [
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Zigo",
    lastName: "Zago",
    countryCode: "+61",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Carlos",
    lastName: "Zampa",
    countryCode: "+61",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Aldair",
    lastName: "Santos",
    countryCode: "+61",
    phoneNumber: "+67133212"
  },
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Gabriel Omar",
    lastName: "Battistuta",
    countryCode: "+61",
    phoneNumber: "+67133212"
  } ,
  {
    suburb: "Brighton",
    emailId: "test@test.com",
    firstName: "Francesco",
    lastName: "Totti",
    countryCode: "+61",
    phoneNumber: "+67133212"
  }
];

const AdView = props => {

//check if data is available otherwise renders 404
  if (props.location.state === undefined) {
    return <FourOFour />;
  }
// data
  const {
    category,
    description,
    status,
    title,
    createdAt,
    _id
  } = props.location.state;
  
  console.log("_id", _id)
  //change the status of the adv

  const handleStatusAdv = async() => {
    const data = {
      "listId": _id
    }
    const respData = await API.confirmInterest(data)
    if(respData){
      console.log("gone")
    }
  }
  return (
    <Grid container justify="center" style={{ padding: "5vh 0" }}>
      <Grid item xs={11} md={6} lg={4}>
        <Card>
          <CardHeader>
            <Grid container justify="space-between">
              <Grid item xs={5}>
                <Typography variant="caption">{category}</Typography>
              </Grid>
              <Grid item xs={5} align="right">
                <Typography
                  style={status === "AVAILABLE" ? { color: "green" } : ""}
                >
                  {status}
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="caption">
                  {moment(createdAt).format("LL")}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="h5">{title}</Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="caption">{description}</Typography>
          </CardBody>
          <CardFooter>
            <Grid container>
              <Grid item align="center" xs={11}>
                <RegularButton color="primary" onClick={()=> handleStatusAdv()}>
                  {" "}
                  Transaction Completed
                </RegularButton>
              </Grid>
            </Grid>
          </CardFooter>
        </Card>
      </Grid>
      <Grid container justify="center" style={{ padding: "3vh 0" }}>
        <Grid item xs={11} >
          <Typography variant="h5">Person interested</Typography>
        </Grid>
        <Grid item xs={11} style={{ padding: "3vh 0" }}>
          <ExpansionPanelComponent interestedData={interestPeopleData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(AdView);
