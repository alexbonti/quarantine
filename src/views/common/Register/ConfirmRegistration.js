import React, {useState, useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { CustomInput, RegularButton, Card, CardBody } from 'components/index'
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
import { API } from "helpers/index";
import { LayoutConfig } from "configurations";
import {LoginContext} from "contexts"


  const  applicationTheme = createMuiTheme({
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

const ConfirmRegistration = (props) => {
    const {accessToken} = (props.location.state.response)
    const [OTP, setOTP] = useState("")
    const {setAccessToken, setLoginStatus} = useContext(LoginContext)


    const sendOTP = async () =>{
        const data = {
            OTPCode: OTP
        }

        const dataResponseOTP = await API.verifyOTP(data, accessToken)
        if(dataResponseOTP){
            setAccessToken(accessToken)
            setLoginStatus(true)
        }
    }

    return (
        <MuiThemeProvider theme={applicationTheme}>

        <Grid container justify="center" alignItems="center" style={{height: "70vh"}}>
            <Grid item xs={11}>
                <Card>
                    <CardBody>
                        <Typography variant="body1">
                            An OTP code has been sent to your email
                        </Typography>
                        <CustomInput 
                        id="OTP"
                        labelText="OTP*"
                        required
                        fullWidth
                        inputProps={{
                          label: "OTP Code",
                          placeholder: "Insert your otp",
                          name: "OTP",
                          onChange: e => setOTP(e.target.value)
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}/>
                    </CardBody>
                    <Grid item xs={12} align="center" style={{padding: "2vh 0"}}>

                        <RegularButton color="info" onClick={()=> sendOTP() }>
                            Confirm OTP
                        </RegularButton>
                        <RegularButton color="info" onClick={()=> sendOTP()}>
                            Resend OTP
                        </RegularButton>
                        </Grid>
                </Card>
                        
            </Grid>
        </Grid>
        </MuiThemeProvider>
    )
}


export default withRouter(ConfirmRegistration)
