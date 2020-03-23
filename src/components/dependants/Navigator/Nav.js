import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const  NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
   
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            Home
          </Typography>
          <Typography variant="h6" className={classes.title} component={Link} to="/FAQ">
            Faq
          </Typography>
          <Typography variant="h6" className={classes.title} component={Link} to="/marketplace">
            Locals
          </Typography>
          <Typography variant="h6" className={classes.title} component={Link} to="/profile">
            Profile
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}