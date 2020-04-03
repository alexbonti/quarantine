import React , {useState}from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import {CustomInput, RegularButton} from "components"
import {Paper, Grid, Typography} from "@material-ui/core"
import { API } from 'helpers/index'
import { FourOFour } from '../FourOFour/FourOFour'
import { notify } from 'components/index'

 

const  ResetPassword = (props) => {

    const [otpCode, setOtpCode ] = useState("")
    const [newPassowrd, setNewPassword ] = useState("")
    const [confirmNewPassword, setConfirmNewPassword ] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    if(props.location.state === undefined) return <FourOFour />
    const {emailId} = props.location.state





    const handleChangePassword = async () => {
        setPasswordError(false)
        if(confirmNewPassword !== newPassowrd){
            setNewPassword("")
            setConfirmNewPassword("")
            setPasswordError(true)
            return notify("Passwords don't match")
        }
        const data = {
            OTPCode: otpCode,
            password: newPassowrd,
            emailId
        }
        const dataRespEmail = await API.resetPassword(data)
        if(dataRespEmail) {
            setRedirect(true)
            notify("Password saved")
        }
    }
    return redirect ? <Redirect to={{ pathname: "/login"}}  /> : (
        <Grid container justify="center" style={{padding: "5vh"}}>
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          lg={3}
          xl={2}
        >
          <Paper style={{padding: "2vh "}}>
            <form noValidate>
            <Typography variant="body1"> A verification code has been sent to your email</Typography>
            <CustomInput
                id="otp"
                labelText= "Verification code*"
                required
                inputProps={{
                 onChange: (e) => setOtpCode(e.target.value),
                  placeholder: "Verification Code",
                  name: "Verification code",
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <CustomInput
                id="newPassword"
                labelText= "New Password*"
                required
                error={passwordError}
                inputProps={{
                 onChange: (e) => setNewPassword(e.target.value),
                  placeholder: "New Password",
                  type: "password",
                  name: "password",
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <CustomInput
                id="confirmPassword"
                labelText= "Confirm Password*"
                required
                inputProps={{
                 onChange: (e) => setConfirmNewPassword(e.target.value),
                  placeholder: "Confirm Password",
                  type: "password",
                  name: "password",
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
             
              <RegularButton
                fullWidth
                variant="contained"
                color="info"
                style={{marginTop: "30px"}}
                onClick={()=>handleChangePassword()}
              >
                Next
              </RegularButton>
            </form>
          </Paper>
        </Grid>
        </Grid>
    )
}


export default withRouter(ResetPassword)