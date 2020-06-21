/***
 *  Created by Sanchit Dang
 ***/
import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Grid,
  InputAdornment
} from "@material-ui/core";
import { LoginContext } from "contexts";
import { notify } from "components";
import { DevModeConfig } from "configurations";
import { API, useKeyPress } from "helpers";
import { RegularButton, CustomInput } from "components";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';import LockOpenIcon from "@material-ui/icons/LockOpen";
import dito_logo from 'assets/img/dito-logo-03-title.svg';
import cfc_logo from 'assets/img/CallForCodeLogo.png';
import slack from 'assets/img/Slack-dito.png'
import contact from 'assets/img/dito-contact.png'


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  loginBox: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "10px"
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
    type: "light",
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
      fontSize: 18,
      color: "#d0d0d0"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "#d0d0d0 ",
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
export const Login = () => {
  const classes = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { devMode, loginStatus, setLoginStatus, setAccessToken } = useContext(
    LoginContext
  );
  const performLogin = () => {
    if (DevModeConfig.bypassBackend) {
      setLoginStatus(true);
      setAccessToken("dummyToken");
    } else {
      let details = {
        emailId: devMode
          ? DevModeConfig.devDetails !== undefined
            ? DevModeConfig.devDetails.user
            : ""
          : emailId,
        password: devMode
          ? DevModeConfig.devDetails !== undefined
            ? DevModeConfig.devDetails.password
            : ""
          : password
      };
      
      API.login(details, setAccessToken);
    }
  };

  const validationCheck = () => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const email = emailId;
      const pwd = password;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailPatternTest = emailPattern.test(email);
      if (emailPatternTest && pwd) {
        performLogin();
        return true;
      } else if (emailPatternTest === undefined && pwd === undefined) {
        notify("Email or password must not be empty!");
        return false;
      } else if (!emailPatternTest) {
        notify("Email must not be empty!");
        return false;
      } else if (!emailPatternTest && email.length > 0) {
        notify("Invalid email!");
        return false;
      } else if (!pwd) {
        notify("Password must not be empty!");
        return false;
      }
    }
  };
  useKeyPress("Enter", () => {
    validationCheck();
  });

  let content = (
    <>
    <MuiThemeProvider theme={applicationTheme}>
       
      <Grid container spacing={0} justify="center">
      <Grid item xs={12} align="center">
                  <img src={cfc_logo} style={{width:150}} align="center"/>

                  {/* <Typography variant="h5" align="center" style={{fontSize:24,color:'black',fontFamily:'fantasy',fontWeight:'400'}}>
                    #CallforCode2020
                </Typography> */}
                  {/* <Typography
            
              variant="h5" style={{fontSize:"14px"}}
            >
             DiTo is a volountary project, and we are looking for great people to help us develop it further.
             Our Project page will soon be available. 
            </Typography>
            
              <p><a href="https://join.slack.com/t/dito-space/shared_invite/zt-d8iz2vyd-G2wTkd7cH_JFergOkYsDew"><img src={slack} height="75px"></img></a>
              <a href="https://forms.gle/HDCnCRwFLVgwPxZt5"><img src={contact} height="75px"></img></a></p> */}

            
        </Grid>
        <Grid
          className={classes.loginBox}
          item
          xs={10}
          sm={6}
          md={4}
          lg={3}
          xl={2}
        >
          <Paper className={classes.paper}>
            <form noValidate>
            <CustomInput
                id="emailId"
                labelText= "Email*"
                required
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                  placeholder: "Email",
                  type: "email",
                  name: "email",
                  onChange: e => setEmailId(e.target.value)
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <CustomInput
              style={{margin: " 0px important"}}
                id="password"
                labelText= "Password*"
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                  placeholder: "Password",
                  type: "password",
                  name: "password",
                  onChange: e => setPassword(e.target.value)

                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <Link to="/forgot-password" style={{fontSize: "10px", borderBottom: "1px solid rgb(74, 74, 74)", color: "rgb(74, 74, 74)"}}>Forgot password ?</Link>
              <RegularButton
                fullWidth
                variant="contained"
                color="info"
                className={classes.buttons}
                onClick={validationCheck}
                style={{marginTop: "30px"}}
              >
                Login
              </RegularButton>
              <RegularButton  fullWidth variant="contained" color="info" className={classes.buttons} component={Link} to='/register'>Sign Up</RegularButton>
              <RegularButton  fullWidth variant="contained" color="info" className={classes.buttons} component={Link} to='/'>Back</RegularButton>
            </form>
          </Paper>
        </Grid>

      </Grid>
    </MuiThemeProvider>
    <Grid container justify="center">
        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center" style={{indexZ: -1}}>
              Developed by Deakin Launchpad
            </Typography>
          </Box>
        </Grid>
        </Grid>
        </>
  );
  return content;
};
