import React , {useState}from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import {CustomInput, RegularButton} from "components"
import {Paper, Grid, } from "@material-ui/core"
import { API } from 'helpers/index'
import { notify } from 'components/index'

 

const  ForgotPassword = () => {

    const [emailId, setEmailId ] = useState("")
    const [response, setResponse ] = useState({})

    const [redirect, setRedirect ] = useState(false)


    const handleEmail = async () => {
        const data = {emailId}
        const dataRespEmail = await API.forgotPassword(data)
        if(dataRespEmail) {
            setResponse(dataRespEmail)
            setRedirect(true)
        }
    }
    return redirect ? <Redirect to={{ pathname: "/reset-password", state: { response, emailId }}}  /> : (
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
            <CustomInput
                id="emailId"
                labelText= "Email*"
                required
                inputProps={{
                 onChange: (e) => setEmailId(e.target.value),
                  placeholder: "Email",
                  type: "email",
                  name: "email",
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
                onClick={()=>handleEmail()}
              >
                Next
              </RegularButton>
            </form>
          </Paper>
        </Grid>
        </Grid>
    )
}


export default withRouter(ForgotPassword)