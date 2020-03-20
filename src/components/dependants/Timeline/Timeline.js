import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import cx from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment,Typography } from "@material-ui/core/";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

// core components
import { Badge, CustomInput, Snackbar } from "components";

import styles from "assets/jss/projectJss/components/timelineStyle.js";
import { RegularButton } from "../CustomButtons/Button";
import { API } from "helpers/index";
// import context
const useStyles = makeStyles(styles);

export const TimeLine = props => {
  const classes = useStyles();
  const { stories, simple } = props;
  const [buttonOther, setButtonOther] = useState(false);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");
  const handleAnswer = () => setButtonOther(!buttonOther);
  const [handleNotificationSent, setHandleNotificationSent] = useState(false);
  const [handleNotificationAccepted, setHandleNotificationAccepted] = useState(
    false
  );

  useEffect(() => {
    const getUserData = async () => {
      const dataUser = await API.getProfile();
      if (dataUser) {
        setUserId(dataUser._id);
      }
    };
    getUserData();
  }, []);

  const handlSendText = async (id, type) => {
    const data = {
      requestId: id,
      message: type === "other" ? message : "Accepted",
      approve: type
    };
    const messResp = await API.updateRequest(data);
    if (messResp) {
      setButtonOther(false);
      type === "true"
        ? setHandleNotificationAccepted(true)
        : setHandleNotificationSent(true);
      setTimeout(() => setRedirect(true), 600);
    }
  };

  const handleEscalateToThirdParty = async(contractId) =>{

    const data = {
      contractId: contractId
    }
    const responseThirdParty = await API.raiseToRegulator(data)
    if(responseThirdParty){
      setHandleNotificationSent(true)
      setTimeout(() => setRedirect(true), 600);
    }

  }

  const timelineClass =
    classes.timeline +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });
  return redirect ? (
    <Redirect to="/contracts-list" />
  ) : (
    <ul className={timelineClass}>
      {stories.map((prop, key) => {
        const whoAmI = prop.requestor === userId ? "REQUESTOR" : "RESPONDENT";

        const valueRespondent =
          whoAmI === "RESPONDENT"
            ? _.findLastIndex(stories, o => o.user === "REQUESTOR")
            : _.findLastIndex(stories, o => o.user === "RESPONDENT");

        const lastOne = stories[stories.length - 1].user === whoAmI;

        const showButtons = key === valueRespondent ? true : false;


        const panelClasses =
          classes.timelinePanel +
          " " +
          cx({
            [classes.timelinePanelInverted]: prop.inverted || simple,
            [classes.timelineSimplePanel]: simple
          });
        const timelineBadgeClasses =
          classes.timelineBadge +
          " " +
          classes[prop.badgeColor] +
          " " +
          cx({
            [classes.timelineSimpleBadge]: simple
          });



        return (
          <li className={classes.item} key={key}>

            {prop.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                <prop.badgeIcon className={classes.badgeIcon} />
              </div>
            ) : null}
            <div className={panelClasses}>
              {prop.contractRegulator ? 
                <Typography variant="caption" color="secondary">VCAT Processing</Typography> : ""
              }
              {prop.title ? (
                <div className={classes.timelineHeading}>
                  {}
                  <Badge color={prop.titleColor}>{prop.title}</Badge>
                </div>
              ) : null}
              {prop.subType === "CRITICALREQUEST" ? <span style={{color: "red", fontSize: "12px"}}>Escalated to VCAT  </span> : ""}
              {prop.userName ? <div>{prop.userName}</div> : ""}
              <div className={classes.timelineBody}>{prop.body}</div>
              {prop.fine ? <div>Fine $: {prop.fine.toString().substring(0,6)}</div>: ""}
              {prop.footerTitle ? (
                <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
              ) : null}
              
              {prop.footer ? <hr className={classes.footerLine} /> : null}
              {prop.footer ? (
                <div className={classes.timelineFooter}>{prop.footer}</div>
              ) : null}
              {prop.id ? (
                <h6 className={classes.timelineFooter}>
                  ID: {prop.id.substring(0, 20)}...
                </h6>
              ) : null}
              {prop.buttonOther &&
              showButtons &&
              !lastOne &&
              !prop.contractRegulator &&
              prop.status !== "SIGNED" ?  (
                <>
                <RegularButton
                  size="sm"
                  color="info"
                  onClick={() => handleAnswer()}
                >
                  Answer
                </RegularButton>
                 {!prop.contractRegulator && prop.buttonThirdParty  ? (
                  <RegularButton
                  size="sm"
                  color="danger"
                  onClick={()=> handleEscalateToThirdParty(prop.contractId)}
                >
                  Escalate to VCAT
                </RegularButton>
                ): (
                  ""
                )}
                </>
              
              )  :  (
                ""
              )}
              {prop.buttonThirdParty? (
                 prop.buttonAccept &&
                 showButtons &&
                 !lastOne &&
                 !prop.contractRegulator &&
                 whoAmI === "REQUESTOR" ? (
                   <RegularButton
                     onClick={() => {
                       handlSendText(prop.requestId, "true");
                     }}
                     size="sm"
                     color="success"
                   >
                     Confirm
                   </RegularButton>
              ): (
                ""
              )) : (
                prop.buttonAccept &&
              showButtons &&
              !lastOne &&
              whoAmI === "RESPONDENT" ? (
                <RegularButton
                  onClick={() => {
                    handlSendText(prop.requestId, "true");
                  }}
                  size="sm"
                  color="success"
                >
                  Confirm
                </RegularButton>
              ) : (
                ""
              ))}
              {buttonOther && showButtons && !lastOne ? (
                <CustomInput
                  inputProps={{
                    label: "Message",
                    placeholder: "Write here...",
                    onChange: e => setMessage(e.target.value),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => handlSendText(prop.requestId, "other")}
                      >
                        <SendOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              ) : (
                ""
              )}
            </div>
            <Snackbar
              place="tr"
              color="success"
              message="Message Sent"
              open={handleNotificationSent}
              closeNotification={() => setHandleNotificationSent(false)}
              close
            />
            <Snackbar
              place="tr"
              color="success"
              message="Request Accepted"
              open={handleNotificationAccepted}
              closeNotification={() => setHandleNotificationAccepted(false)}
              close
            />
          </li>
        );
      })}
    </ul>
  );
};

TimeLine.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};
