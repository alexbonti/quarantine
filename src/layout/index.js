import React from 'react';
import { makeStyles, useMediaQuery, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Header, BottomNavToolbar , NavBar} from 'components';
import { LayoutConfig } from 'configurations';
import dito_logo from 'assets/img/dito-logo-03-title.svg'
import dito1 from 'assets/img/dito1.png'
import dito3 from 'assets/img/dito3.png'

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
       type: "light",
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
        fontSize: 14,
        color: "rgb(0, 172, 193)"
      },
      body1: {
        fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
        fontSize: 16,
        color: "#000000"
      },
      body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
      caption: {
        color: "#000000 ",
        fontSize: "12px ",
        fontFamily: "Helvetica, sans-serif"
      },
      h6: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 12,
        color: "#000000"
      },
      h4: {
        fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: 28,
        color: "#000000"
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
        {isItDesktop ? null: LayoutConfig.bottomMobileNavigation ? LayoutConfig.displayMobileHeader ? <Header /> : null : <Header />}
        <main className={isItDesktop ? classes.content : classes.mobileContent} id="desktopVersion">
        {isItDesktop ?<div className="layercover" style={{height: "100vh", width: "100vw", position: "fixed", zIndex: "1000", backgroundColor: "white",}}> 
   

  <header class="text-black">
    <div class="container text-center">
      
      <div class="container">
      <div class="row" >
        
        <div class="col-lg-6" style={{height:600}}>
        <img src={dito_logo} height="200px"></img>
          <div style={{paddingLeft:60}}>
          <h3>Locals helping Locals</h3>
          <p class="lead"><b>Distant but Together</b> is a collaborations of academics, developers and comunity leaders who have worked together to help people in need.
          </p>
          <p><b>It is a race against time, so for now we are fully focusing on the mobile view, please make your screen smaller if you want to try, or access directly from your phone!</b></p>
          
          </div>
        
        </div>
        <div class="col-lg-4 mx-auto">
        <img src={dito3} height="600px"></img>
        </div>
      </div>
    </div>
    <div class="container">
      <p class="m-0 text-center text-black">Copyright &copy; DiTo 2020</p>
    </div>
    </div>
  </header>
        
        </div>: ""}

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

