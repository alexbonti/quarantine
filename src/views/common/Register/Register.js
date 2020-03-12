/***
 *  Created by Sanchit Dang
 ***/
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import { notify, Card, RegularButton, CustomInput } from "components";
import { LayoutConfig } from "configurations";
import { API } from "helpers/index";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    backgroundColor: "#0A2463"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttons: {
    marginTop: theme.spacing(1)
  },
  developMessage: {
    position: "absolute",
    bottom: "1vh"
  }
}));
let applicationTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.primary !== undefined
              ? LayoutConfig.theme.colors.primary
              : null
            : null
          : null
    },
    secondary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.secondary !== undefined
              ? LayoutConfig.theme.colors.secondary
              : null
            : null
          : null
    }
  },
  typography: {
    h6: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 18,
      color: "white"
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 16,
      color: "#fff"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "#fff ",
      fontSize: "12px ",
      fontFamily: "Helvetica, sans-serif"
    },
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
      color: "#00acc1"
    },
    subtitle1: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 10,
      color: "white"
    }
  }
});
export const Register = () => {
  const classes = useStyles();
  const [pageHeading] = useState("Register");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState("")
  const [redirect, setRedirect] = useState(false);



  const register = async ()=> {
    const data = {
      firstName,
      lastName,
      emailId,
      phoneNumber,
      countryCode: "+61",
      password
    }


    const dataResponseRegister = await API.registerUser(data)
    if(dataResponseRegister){

      setResponse(dataResponseRegister)
      setRedirect(true)
    }
  };


  const validationCheck = () => {
    if (
      emailId.length < 0 ||
      password.length < 0 ||
      confirmPassword.length < 0 ||
      firstName.length < 0 ||
      lastName.length < 0 ||
      emailId === "" ||
      password === "" ||
      confirmPassword === "" ||
      firstName === "" ||
      lastName === ""||
      phoneNumber === "" ||
      phoneNumber.length < 0
    ) {
      return notify("Please fill in all the details.");
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      notify("Email not in proper format");
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match.");
    }
    if (emailPatternTest) {
      return register();
    }
  };

  let content = (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid container spacing={0} justify="center">
        <Grid
          className={classes.registerBox}
          item
          xs={10}
          sm={6}
          md={4}
          lg={3}
          xl={2}
        >
          <Paper className={classes.paper}>
            <Grid container justify="center">
              <Grid item xs={11}>
                <Typography component="h1" variant="h5">
                  {pageHeading}
                </Typography>
              </Grid>
            
            <Grid item xs={11}>
             
                <CustomInput
                  id="First Name"
                  labelText="First Name*"
                  required
                  fullWidth
                  inputProps={{
                    label: "First Name",
                    placeholder: "First Name",
                    name: "First Name",
                    onChange: e => setFirstName(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                   id="Last Name"
                   labelText="Last Name*"
                   required
                   fullWidth
                   inputProps={{
                     label: "Last Name",
                     placeholder: "Last Name",
                     name: "Last Name",
                     onChange: e => setLastName(e.target.value)
                   }}
                   formControlProps={{
                     fullWidth: true
                   }}
                />
                <CustomInput
                  id="Email "
                  labelText="Email *"
                  required
                  fullWidth
                  inputProps={{
                    label: "Email ",
                    placeholder: "Email ",
                    name: "Email ",
                    type: "email",
                    onChange: e => setEmailId(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  id="phoneNumber "
                  labelText="Mobile Number *"
                  required
                  fullWidth
                  inputProps={{
                    label: "Mobile Number ",
                    placeholder: "Mobile Number ",
                    name: "phoneNumber ",
                    type: "tel",
                    onChange: e => setPhoneNumber(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  id="Password "
                  labelText="Password *"
                  required
                  fullWidth
                  inputProps={{
                    label: "Password ",
                    placeholder: "Password ",
                    name: "Password ",
                    type: "password",
                    onChange: e => setPassword(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />

                <CustomInput
                id="confirmPassword "
                labelText="Confirm Password *"
                required
                fullWidth
                inputProps={{
                  placeholder: "Confirm Password ",
                  name: "confirmPassword ",
                  type: "password",
                  onChange: e => setConfirmPassword(e.target.value)
                }}
                formControlProps={{
                  fullWidth: true
                }}
                />

                <RegularButton
                  fullWidth
                  variant="contained"
                  color="info"
                  className={classes.buttons}
                  onClick={validationCheck}
                >
                  Register
                </RegularButton>
                <RegularButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  component={Link}
                  to="/login"
                >
                  Back
                </RegularButton>
            </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Developed by Deakin Launchpad
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
  return redirect ? <Redirect  to={{ pathname: "/confirm-registration", state:{response } }}/> : content;
};
