import React, { useState, useContext } from "react";
import { withRouter, Redirect, Link} from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Card, CardHeader, CardBody, CardFooter, Heading } from "components";
import { FourOFour } from "views/common/FourOFour/FourOFour";
import { RegularButton, ExpansionPanelComponent, notify } from "components/index";
import moment from "moment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {LoginContext} from "contexts"


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
  },
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

  //context get login status
  const {loginStatus} = useContext(LoginContext)
  console.log("loginStatus", loginStatus)
  //state
  const [redirect, setRedirect] = useState(false)
  const [itemClicked, setItemClicked] = useState(false);
  const [styleItem, setStyleItem] = useState({
    margin: "1vh  0",
    opacity: "1",
    color: "white"
  });
  const [styleCancelItem, setStyleCancelItem] = useState({
    opacity: "0",
    position: "relative",
    top: "200px",
    transition: "all .3s"
  });
  const handleDeleteItem = id => {
    setItemClicked(!itemClicked);
    itemClicked
      ? setStyleItem({ margin: "1vh  0", opacity: "1", color: "white" })
      : setStyleItem({
          position: "relative",
          top: "200px",
          margin: "1vh  0",
          opacity: "0",
          transform: "scale(.5)",
          color: "white"
        });

    itemClicked
      ? setStyleCancelItem({
          opacity: "0",
          position: "relative",
          top: "200px",
          transition: "all .3s"
        })
      : setStyleCancelItem({
          opacity: "1",
          position: "relative",
          top: "-10px",
          transition: "all .3s"
        });
  };
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
    _id, 
    postedBy,
  } = props.location.state.item

  const {profileId} = props.location.state

  console.log("_id", props);

  //change the status of the adv

  const handleStatusAdv = async () => {
    const data = {
      listId: _id
    };
    const respData = await API.completeListing(data);
    if (respData) {
      notify("Adv Closed")
    }
  };

  const handleInterestedAd = async () => {
    const data = {
      listId: _id
    };
    const respData = await API.confirmInterest(data);
    if (respData) {
        notify("Interested")
    }
  };
  // delete the adv 
const showButton  =  loginStatus ? (postedBy  === profileId? true : false) : ""
console.log("showButton", showButton)
  const handleDeleteAdv = async () => {
    const data = {
      listId: _id
    };
    const respData = await API.deleteListing(data);
    if (respData) {
      notify("Adv Deleted")
      setRedirect(true)  }
  };

  return redirect ? (<Redirect to="/profile"/>) : (
    <Grid container justify="center" style={{ padding: "5vh 0" }}>
      <Grid item xs={11} md={6} lg={4}>
        <Card>
          <CardHeader>
            <Grid container justify="space-between">
              <Grid item xs={5} md={6}>
                <Typography variant="caption">{category}</Typography>
              </Grid>
              <Grid item xs={5} md={6} align="right">
                <Typography
                  style={status === "AVAILABLE" ? { color: "#8bdc8b" } : { color: "red" } }
                >
                  {status}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="caption">
                  {moment(createdAt).format("LL")}
                </Typography>
              </Grid>
              <Grid item xs={3} container align="right" justify="space-evenly">
                <Grid item xs={2}>
                  <DeleteForeverIcon
                    style={styleItem}
                    onClick={() => handleDeleteItem()}
                  />
                </Grid>
                <Grid item xs={2}  component={Link}
                     to={{ pathname: "/adedit", state: props.location.state.item} }>
                  <EditOutlinedIcon
                    style={styleItem}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Typography variant="h5">{title}</Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="caption">{description}</Typography>
          </CardBody>
          <CardFooter>
            <Grid container>
              <Grid
                item
                align="center"
                xs={12}
                container
                justify="space-around"
              >
                <RegularButton style={styleCancelItem} color="danger"                     onClick={() => handleDeleteAdv()}
>
                  Delete
                </RegularButton>
                <Grid item align="center" xs={5}>
                  <RegularButton
                    onClick={() => handleDeleteItem()}
                    style={styleCancelItem}
                    color="info"
                  >
                    Cancel
                  </RegularButton>
                </Grid>
              </Grid>
              {status === "COMPLETED" ? (""): (<Grid item xs={11}>
                <RegularButton
                  color="primary"
                  onClick={() => handleStatusAdv()}
                >
                  {" "}
                  Close Adv
                </RegularButton>
              </Grid>) }
              {!showButton ? (""): (<Grid item xs={11}>
                <RegularButton
                  color="primary"
                  onClick={() => handleInterestedAd()}
                >
                  {" "}
                  Interested
                </RegularButton>
              </Grid>) }
            </Grid>
          </CardFooter>
        </Card>
        <Grid container justify="center" style={{ padding: "3vh 0" }}>
          <Grid item xs={12}>
            <Typography variant="h5">Users Interested</Typography>
          </Grid>
          <Grid item xs={12} style={{ padding: "3vh 0" }}>
            <ExpansionPanelComponent interestedData={interestPeopleData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(AdView);
