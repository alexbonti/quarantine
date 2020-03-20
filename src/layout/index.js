import React from 'react';
import { makeStyles, useMediaQuery, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Header, BottomNavToolbar , NavBar} from 'components';
import { LayoutConfig } from 'configurations';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    flex: '0 0 auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  mobileContent: {
    '-webkit-overflow-scrolling': 'touch',
    flexGrow: 1,
    height: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingTop: "65px"

  },
  iOSPadding: {
    height: iOS ? theme.spacing(2) : 0
  },
}));

export const Layout = (props) => {
  const classes = useStyles();

   let applicationTheme = createMuiTheme({
    palette: {
       type: "dark",
      primary: {
        main: LayoutConfig.theme !== undefined ? LayoutConfig.theme.colors !== undefined ? LayoutConfig.theme.colors.primary !== undefined ? LayoutConfig.theme.colors.primary : null : null : null
      },
      secondary: {
        main: LayoutConfig.theme !== undefined ? LayoutConfig.theme.colors !== undefined ? LayoutConfig.theme.colors.secondary !== undefined ? LayoutConfig.theme.colors.secondary : null : null : null
      },
      
    },
    typography: {
      h5: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        color: "#ded6d6"
      },
      body1: {
        fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
        fontSize: 16,
        color: "#ded6d6"
      },
      body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
      caption: {
        color: "#ded6d6 ",
        fontSize: "12px ",
        fontFamily: "Helvetica, sans-serif"
      },
      h6: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 12,
        color: "#ded6d6"
      },
      h4: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 28,
        color: "#ded6d6"
      },
      subtitle1: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 10,
        color: "white"
      },
      mobileContent: {
      }
    },
  });
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  let content = (
    <MuiThemeProvider theme={applicationTheme} >

      <div className={classes.root}>
        {isItDesktop ? <Header /> : LayoutConfig.bottomMobileNavigation ? LayoutConfig.displayMobileHeader ? <Header /> : null : <Header />}
        <main className={isItDesktop ? classes.content : classes.mobileContent}>
        {isItDesktop ? <NavBar /> : ""}
          {/* <div className={isItDesktop ? classes.appBarSpacer : LayoutConfig.displayMobileHeader ? classes.appBarSpacer : null} /> */}
          {props.children}
          <div className={isItDesktop ? null : LayoutConfig.bottomMobileNavigation ? classes.appBarSpacer : null} />
          <div className={classes.iOSPadding} />
        </main>
        {isItDesktop ? null : LayoutConfig.bottomMobileNavigation ? <BottomNavToolbar /> : null}
      </div>
    </MuiThemeProvider>
  );
  return content;
};

