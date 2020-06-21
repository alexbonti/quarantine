import React, { useState, useContext } from "react";
import clsx from "clsx";
import {
  Grid,
  makeStyles,
  Drawer,
  Divider,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import dito_logo from 'assets/img/dito_logo_04.svg';
import cfc_home_logo from 'assets/img/CallForCodeHome.png';
import { SideMenuItems } from "./SideMenuItems";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { LayoutConfig } from "configurations";
import { LayoutContext } from "contexts";
import MenuIcon from "@material-ui/icons/Menu";
import PetsIcon from "@material-ui/icons/Pets";
import { blackColor } from "assets/jss/baseJss";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 100 // keep right padding when drawer closed
  },
  appBar: {
    backgroundColor:LayoutConfig.theme.colors.color5,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  title: {
    flexGrow: 1,
    color:'red'
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#ababab80",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export const Header = () => {
  let isItDesktop = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const classes = useStyles();
  const [open, setOpen] = useState(
    isItDesktop
      ? LayoutConfig.sideMenu.default === "open"
        ? true
        : false
      : false
  );
  const { pageTitle, headerElements } = useContext(LayoutContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  let content = (
    <>
      <AppBar
        elevation={
          LayoutConfig.theme !== undefined
            ? LayoutConfig.theme.appBarElevation !== undefined
              ? LayoutConfig.theme.appBarElevation
              : 1
            : 1
        }
        position={LayoutConfig.sideMenu.permanent ? "fixed" : "absolute"}
        className={
          LayoutConfig.sideMenu.permanent
            ? isItDesktop
              ? classes.appBarShift
              : classes.appBar
            : clsx(classes.appBar, open && classes.appBarShift)
        }
      >
        <Toolbar className={classes.toolbar}
              style={{paddingLeft:0}}
              >
          {isItDesktop ? (
            LayoutConfig.sideMenu.permanent ? null : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            )
          ) : null}
          {headerElements !== null ? (
            headerElements
          ) : (
            <>
              <Grid container alignItems="center" style={{paddingLeft:0}}>
                <Grid item xs={6} align="center">
                  {/* <img src={cfc_home_logo} style={{width:150}} align="left"/> */}

                  <Typography variant="h5" align="center" style={{fontSize:24,color:'white',fontFamily:'fantasy',fontWeight:'400'}}>
                    #CallForCode2020
                </Typography>
                  
                   
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    component="h1"
                    variant="h5"
                    color="#000000"
                    fontSize='10px'
                    noWrap
                    className={classes.title}
                    align="center"
                  >
                    {""}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isItDesktop ? (
        <Drawer
          anchor="left"
          variant="temporary"
          classes={{
            paper: LayoutConfig.sideMenu.permanent
              ? classes.drawerPaper
              : clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={LayoutConfig.sideMenu.permanent ? true : open}
        >
          <div className={classes.toolbarIcon}>
            {LayoutConfig.sideMenu.permanent ? null : (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </div>
          <Divider />
          <SideMenuItems />
        </Drawer>
      ) : null}
    </>
  );
  return content;
};
