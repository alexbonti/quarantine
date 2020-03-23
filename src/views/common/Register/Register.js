/***
 *  Created by Sanchit Dang
 ***/
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import { notify, RegularButton, CustomInput } from "components";
import { LayoutConfig } from "configurations";
import { API } from "helpers/index";
import imgBG from "../../../assets/img/background-bw.jpg";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    background: "linear-gradient(#36404b, #1b2127)"
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
    },
    selection: {
      "&:hover": {
        color: "blue"
      }
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
  const [response, setResponse] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [suggestedLocations, setSuggestedLocaionts] = useState([]);
  const [valueLocation, setValueLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  /**
   * Error Fields states
   * @error default is false
   */
  const [emailErrorField, setEmailErrorField] = useState(false);
  const [passwordErrorField, setPasswordErrorField] = useState(false);
  const [firstNameErrorField, setFirstNameErrorField] = useState(false);
  console.log("Register -> firstNameErrorField", firstNameErrorField);
  const [lastNameErrorField, setLastNameErrorField] = useState(false);

  const registerUser = async () => {
    const data = {
      firstName,
      lastName,
      emailId,
      phoneNumber,
      countryCode: "+61",
      password,
      suburb: valueLocation,
      lat: latitude,
      long: longitude
    };

    const dataResponseRegister = await API.registerUser(data);
    if (dataResponseRegister) {
      setResponse(dataResponseRegister);
      setRedirect(true);
    }
  };

  const cleanPhoneNumber = phoneNumber => {
    let arrayPhoneNumber = phoneNumber.split("");
    if (arrayPhoneNumber[0] === "0" || arrayPhoneNumber[0] === 0) {
      arrayPhoneNumber.shift();
      setPhoneNumber(arrayPhoneNumber.join(""));
    } else {
      setPhoneNumber(phoneNumber);
    }
  };

  const validationCheck = () => {
    if (emailId.length < 0) {
      setEmailErrorField(true);
      return notify("Email is required");
    }

    if (firstName.length < 0 || firstName.length === 0) {
      setFirstNameErrorField(true);
      return notify("first name field cannot be empty");
    } else {
      setFirstNameErrorField(false);
    }

    if (lastName.length < 0 || lastName.length === 0) {
      setLastNameErrorField(true);
      return notify("last name field cannot be empty");
    } else {
      setLastNameErrorField(false);
    }

    if (emailId.length < 0 || emailId === "") {
      setEmailErrorField(true);
      return notify("email field cannot be empty");
    } else {
      setEmailErrorField(false);
    }
    if (password.length < 0 || confirmPassword.length < 0) {
      setPasswordErrorField(true);
      return notify("Password field cannot be empty");
    } else {
      setPasswordErrorField(false);
    }

    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);

    const namePattern = /^[a-zA-Z]*$/;

    const firstNamePatternTest = namePattern.test(firstName);
    const lastNamePatternTest = namePattern.test(lastName);


    if (!firstNamePatternTest) {
      setFirstNameErrorField(true);
      notify("First Name  should not include numbers or symbols");
    } else {
      setFirstNameErrorField(false);
    }


    if (!lastNamePatternTest) {
      setLastNameErrorField(true);
      notify("Last Name should not include numbers or symbols");
    } else {
      setLastNameErrorField(false);
    }

    if (!emailPatternTest) {
      // setEmailFieldError(true);
      notify("Email not in proper format");
    }
    if (password !== confirmPassword) {
      return notify("Passwords are different.");
    }
    if (emailPatternTest && firstNamePatternTest && lastNamePatternTest) {
      return registerUser();
    }

  };

  const getLocation = async input => {
    const locationSuggestionsResp = await API.getAddress(input);
    if (locationSuggestionsResp) {
      setSuggestedLocaionts(locationSuggestionsResp.suggestions);
    }
  };

  const getLatLong = async input => {
    const longLatResp = await API.getLatLong(input);
    if (longLatResp) {
      setLatitude(longLatResp.response.latitude);
      setLongitude(longLatResp.response.longitude);
    }
  };

  let content = (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid
        container
        spacing={0}
        justify="center"
        style={{ backgroundImg: `url(${imgBG})` }}
      >
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
                  error={firstNameErrorField}
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
                  error={lastNameErrorField}
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
                  error={emailErrorField}
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
                <Grid container alignItems="baseline" justify="space-between">
                  <Grid item xs={1}>
                    <Typography variant="body1">+61</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      id="phoneNumber "
                      labelText="Mobile Number *"
                      required
                      inputProps={{
                        label: "Mobile Number ",
                        placeholder: "Mobile Number ",
                        name: "phoneNumber ",
                        type: "tel",
                        onChange: e => cleanPhoneNumber(e.target.value)
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </Grid>
                </Grid>
                <CustomInput
                  id="Password "
                  labelText="Password *"
                  required
                  fullWidth
                  error={passwordErrorField}
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
                  error={passwordErrorField}
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

                <CustomInput
                  id="getLocation "
                  labelText="Location *"
                  required
                  fullWidth
                  inputProps={{
                    placeholder: "Suburb ",
                    name: "location ",
                    autoComplete: "hidden",
                    value: valueLocation !== "" ? valueLocation : "",
                    onChange: e => {
                      getLocation(e.target.value);
                      setValueLocation(e.target.value);
                    }
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />

                {suggestedLocations !== undefined ? (
                  <Grid container>
                    {suggestedLocations.map((location, key) => {
                      return (
                        <Grid item key={key} xs={12}>
                          <Typography
                            variant="caption"
                            onClick={e => {
                              getLatLong(location.locationId);
                              setValueLocation(e.target.innerText);
                              setSuggestedLocaionts([]);
                            }}
                          >
                            {location.address.district}{" "}
                            {location.address.postalCode}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  ""
                )}

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
      </Grid>
    </MuiThemeProvider>
  );
  return redirect ? (
    <Redirect to={{ pathname: "/confirm-registration", state: { response } }} />
  ) : (
    content
  );
};
