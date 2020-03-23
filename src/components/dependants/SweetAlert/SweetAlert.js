import React from 'react';
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {RegularButton} from "components"
// styles for buttons on sweetalert
import styles from "assets/jss/projectJss/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);

export const SweetAlertSuccess=({callback}) =>{
//const {signContract, modus, _id} = callback;
  const [alert,setAlert] = React.useState("");
  const hideAlert = () => {
    setAlert("");
  }

  const successAlert = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block"}}
        title="Good job!"
        //onConfirm={() => signContract(modus, _id, hideAlert)}
        onCancel={() => hideAlert()}
        // confirmBtnCssClass={
        //   classes.button + " " + classes.success
        // }
        // confirmBtnText="Sign"
      >
        Sign
      </SweetAlert>
    );
  }
  return (
    <div>
      {alert}
      <RegularButton fullWidth color="success" onClick={successAlert}>
        Accept
      </RegularButton>
    </div>
  );
}

export const SweetAlertWarning =({callback}) =>{
    const classes = useStyles();
    const {signContract, modus, _id} = callback;
    const [alert,setAlert] = React.useState("");
    const hideAlert = () => {
      setAlert("");
    }
  
    const warningWithConfirmAndCancelMessage = () => {
        setAlert(
          <SweetAlert
            warning
            style={{ display: "block", }}
            title="Are you sure?"
            onConfirm={() => signContract(modus, _id, hideAlert)}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={classes.button + " " + classes.success}
            cancelBtnCssClass={classes.button + " " + classes.danger}
            confirmBtnText="Yes, cancel it!"
            cancelBtnText="Back"
            showCancel
          >
            Do you want to cancel this contract ?
          </SweetAlert>
        );
      };
    return (
      <div>
        {alert}
        <RegularButton fullWidth color="danger" onClick={warningWithConfirmAndCancelMessage}>
          Cancel this contract
        </RegularButton>
      </div>
    );
  }