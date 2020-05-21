import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(({
  embedded_messenger : {
    margin: "0",
    'min-height': '60px',
    'min-width': '60px',
    padding: "0",
    position: "fixed",
    bottom: "10px",
    left: "20px",
  },
  embedded_messenger_full : {
    margin: "0",
    width: "300px",
    height: "487px",
    padding: "0",
    position: "fixed",
    bottom: "10px",
    left: "20px",
    'border-radius': '10px',
    //'box-shadow': '0px 0px 10px -3px rgba(0, 0, 0, 0.75)'
  },
  embedded_messenger_mobile : {
    margin: "0",
    padding: "0",
    position: "fixed",
    bottom: "0",
    right: "0",
    top: "56px",
    left: "0"
  },
  contents: {
    height: '100%'
  },
  windowContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: '100%',
  },
  iframe: {
    border: "0",
    height: "100%",
    width: "100%"
  },
  button: {
    background: '#039be5',
    position: 'absolute',
    width: '45px',
    height: '45px',
    'border-radius': '30px',
    padding: '10px',
    bottom: "30px",
    right: "30px",
    cursor: 'pointer'
  },
  fullDisplay: {
    width: '300px',
    height: '480px'
  }
}));

const BOTKIT_URL = process.env.REACT_APP_BOTKIT_URL;
const resources = {
  chatImage: BOTKIT_URL+'resources/images/chat_white_72x72.png',
  chatWindow: BOTKIT_URL+'chatwindow'
};

const Iframe = ({status, classes}) => {
  if (!status)
    return null;

  return <iframe id="botkit_client" title="ChatWindow" className={classes.iframe} src={resources.chatWindow}></iframe>;
};

const Button = ({status, classes, statusChange}) => {
  if (!status)
    return null;

  return (
    <div id="message_header" className="inactive" onClick={statusChange}>
      <img id="chat_icon" alt="chat" src={resources.chatImage} className={classes.button} onClick={statusChange} />
    </div>
  );
};

const MessengerClasses = (classes, windowStatus, mediaQuery) => {
  if (windowStatus) {
    if(mediaQuery)
      return classes.embedded_messenger_mobile;

    return classes.embedded_messenger_full;
  } else {
    return classes.embedded_messenger;
  }
};

export const Chatbot = () => {
  const classes = useStyles();
  const [chatWindowStatus, setChatWindowStatus] = useState(false);
  const mediaQuery = useMediaQuery('(max-width:767.98px)');

  const handleStatusChange = () => {
    console.log("status change is called")
    setChatWindowStatus(!chatWindowStatus);

  }
  

  const onMessageReceived = (event) => {
    if (event.data == 'close botkit') {
        handleStatusChange();
        return
    }
    if (typeof event.data === 'string' && event.data !== ''){
    
      var data = JSON.parse(event.data);

      if (data.toggle.chatWindow) {
        handleStatusChange();
      }
    }
  };

  window.addEventListener("message", onMessageReceived, false);

  return (
    <div id="embedded_messenger" className={MessengerClasses(classes, chatWindowStatus, mediaQuery)}>
      <div className={classes.contents} onClick={handleStatusChange}>
        <div className={classes.windowContainer}>
          <Iframe status={chatWindowStatus} classes={classes} />
        </div>
        <Button status={!chatWindowStatus} classes={classes} statusChange={handleStatusChange} />
      </div>
    </div>
  );
};