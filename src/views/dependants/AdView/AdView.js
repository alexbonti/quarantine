import React, { useState, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Card, CardHeader, CardBody, CardFooter, Heading } from "components";
import { FourOFour } from "views/common/FourOFour/FourOFour";
import FOOD from 'assets/img/food_logo.svg'
import MEDICINES from 'assets/img/medicine_logo.svg'
import ESSENTIALS from 'assets/img/essentials_logo.svg'
import ACCOMMODATION from 'assets/img/accomodation_logo.svg'
import OTHER from 'assets/img/other_logo.svg'
import {
  RegularButton,
  //ExpansionPanelComponent,
  notify,
  CustomInput
} from "components/index";
import moment from "moment";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { LoginContext } from "contexts";

import { API } from "helpers/index";

// const interestPeopleData = [
//   {
//     suburb: "Brighton",
//     emailId: "test@test.com",
//     firstName: "Zigo",
//     lastName: "Zago",
//     countryCode: "+61",
//     phoneNumber: "+67133212"
//   },
//   {
//     suburb: "Brighton",
//     emailId: "test@test.com",
//     firstName: "Carlos",
//     lastName: "Zampa",
//     countryCode: "+61",
//     phoneNumber: "+67133212"
//   },
//   {
//     suburb: "Brighton",
//     emailId: "test@test.com",
//     firstName: "Aldair",
//     lastName: "Santos",
//     countryCode: "+61",
//     phoneNumber: "+67133212"
//   },
//   {
//     suburb: "Brighton",
//     emailId: "test@test.com",
//     firstName: "Gabriel Omar",
//     lastName: "Battistuta",
//     countryCode: "+61",
//     phoneNumber: "+67133212"
//   },
//   {
//     suburb: "Brighton",
//     emailId: "test@test.com",
//     firstName: "Francesco",
//     lastName: "Totti",
//     countryCode: "+61",
//     phoneNumber: "+67133212"
//   }
// ];

const getCategory = (category)=>{
  console.log('categories called',category)
  
  switch(category){
    case 'ACCOMMODATION':
    return ACCOMMODATION;
    case 'FOOD':
    return FOOD;
    case 'MEDICINES':
    return MEDICINES;
    case 'ESSENTIALS':
    return ESSENTIALS;
    case 'OTHER':
    return OTHER;
    


  }
}

const AdView = props => {
  //setImage based on the requirement
  
  



  //context get login status
  const { loginStatus } = useContext(LoginContext);
  //state
  const [redirect, setRedirect] = useState(false);
  // const [itemClicked, setItemClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessageInoput, setShowMessageInput] = useState(false);
  // const [styleItem, setStyleItem] = useState({
    //   margin: "1vh  0",
    //   opacity: "1",
    //   color: "white"
    // });
    // const [styleCancelItem, setStyleCancelItem] = useState({
      //   opacity: "0",
      //   position: "relative",
      //   top: "200px",
      //   transition: "all .3s"
      // });
      // const handleDeleteItem = id => {
        //   setItemClicked(!itemClicked);
        //   itemClicked
        //     ? setStyleItem({ margin: "1vh  0", opacity: "1", color: "white" })
        //     : setStyleItem({
          //         position: "relative",
          //         top: "200px",
          //         margin: "1vh  0",
          //         opacity: "0",
          //         transform: "scale(.5)",
          //         color: "white"
          //       });
          
          //   itemClicked
          //     ? setStyleCancelItem({
            //         opacity: "0",
            //         position: "relative",
            //         top: "200px",
            //         transition: "all .3s"
            //       })
            //     : setStyleCancelItem({
              //         opacity: "1",
              //         position: "relative",
              //         top: "-10px",
              //         transition: "all .3s"
              //       });
              // };
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
                type
              } = props.location.state.item;
              
              const { profileId } = props.location.state;
              const {history} = props.location.state


  //change the status of the adv

  // const handleStatusAdv = async () => {
  //   const data = {
  //     listId: _id
  //   };
  //   const respData = await API.completeListing(data);
  //   if (respData) {
  //     notify("Adv Closed");
  //     setRedirect(true);
  //   }
  // };

  const handleInterestedAd = async () => {
    const data = {
      listId: _id
    };
    const respData = await API.confirmInterest(data);
    if (respData) {
      notify("Interested");
      setRedirect(true);
    }
  };

  const handleContactInNeed = async () => {
    const data = {
      listId: _id,
      message
    };
    const respData = await API.contactInNeed(data);
    if (respData) {
      notify("Message Sent");
      setRedirect(true);
    }
  };

  // delete the adv
  // const handleDeleteAdv = async () => {
  //   const data = {
  //     listId: _id
  //   };
  //   const respData = await API.deleteListing(data);
  //   if (respData) {
  //     notify("Adv Deleted");
  //     setRedirect(true);
  //   }
  // };

  // dynamic buttons
  const showButton = loginStatus
    ? postedBy !== profileId
      ? true
      : false
    : null;
  return redirect ? (
    
    <Redirect to="/profile" />
  ) : (
    
    
    <Grid container justify="center" style={{ padding: "5vh 0" }}>
      <Grid item xs={12}>
         
         <Typography variant="h5" align="center">
         Click to let your local in need you want to help! <br></br>You will both receive an email.
         </Typography>
         <hr />
       </Grid>
      <Grid item xs={11} md={6} lg={4}>
      <Grid item xs={11} >
        <Link to={history}>
      <Heading title=" < BACK" textAlign="left" color="white"/>
        </Link>
      </Grid>
        <Card
        style={{
          height: "100%px",
          width: "100%",
          backgroundColor: "white"
        }}>
          
          <CardHeader>
            <Grid container justify="space-between">
              <Grid item xs={5} md={6}>
              <Typography variant="caption">
                  {moment(createdAt).format("LL")}
                </Typography>
              </Grid>
              <Grid item xs={5} md={6} align="right">
                <Typography
                  style={
                    status === "AVAILABLE"
                      ? { color: "#8bdc8b" }
                      : { color: "red" }
                  }
                >
                  {status}
                </Typography>
              </Grid>
           
              {/* 
              DELETE UPDATE BUTTONS
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
              </Grid> */}
            </Grid>

            <Typography variant="h5">{title}</Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="caption">{description}</Typography>
          </CardBody>
          <CardFooter>
            <Grid container justify="space-between">
              {/* <Grid
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
                </Grid> */}
              {/* </Grid> */}
              {type === "NEED" && showButton ? (
                <Grid item xs={12}>
                  <RegularButton
                    fullWidth
                    color="warning"
                    size="sm"
                    onClick={() => setShowMessageInput(!showMessageInoput)}
                  >
                    {" "}
                    I have what you need
                  </RegularButton>
                </Grid>
              ) : null}
              {/*  Set add Completed disabled
              {status === "COMPLETED" || !showButton? null : (<Grid item xs={11}>
                <RegularButton
                  color="primary"
                  onClick={() => handleStatusAdv()}
                >
                  {" "}
                  Close Adv
                </RegularButton>
              </Grid>) } */}
              {!showButton ||
              status === "COMPLETED" ||
              type ==="NEED" ||
              profileId === undefined ? null : (
                <Grid item xs={4}>
                  <RegularButton
                    color="primary"
                    size="sm"
                    onClick={() => handleInterestedAd()}
                  >
                    {" "}
                    Interested
                  </RegularButton>
                </Grid>
              )}
            </Grid>
          </CardFooter>
        </Card>
        <Grid xs={12} align="center">
         
        

        <img src={getCategory(category)} style={{marginTop:"30px"}} height="150px"></img>

        </Grid>

        <Grid container justify="center" style={{ padding: "3vh 0" }}>
          {/*NOTE show useres interested diabled */}
          {/* <Grid item xs={12}>
            <Typography variant="h5">Users Interested</Typography>
          </Grid> */}
          {/* <Grid item xs={12} style={{ padding: "3vh 0" }}>
            <ExpansionPanelComponent interestedData={interestPeopleData} />
          </Grid> */}
          {showMessageInoput ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader>
                  <Typography variant="h6">
                    Send a message to the user
                  </Typography>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    id="standard-text-description "
                    labelText="Description *"
                    required
                    fullWidth
                    inputProps={{
                      label: "Message ",
                      multiline: true,
                      placeholder: "Message",
                      rows: 3,
                      name: "Message ",
                      onChange: e => setMessage(e.target.value)
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </CardBody>
                <CardFooter>
                  <RegularButton
                    color="primary"
                    onClick={() => {
                      handleContactInNeed();
                    }}
                  >
                    Send
                  </RegularButton>
                </CardFooter>
              </Card>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(AdView);
