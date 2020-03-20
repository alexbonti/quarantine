/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContext } from "contexts";
import {
  Login,
  Register,
  Home,
  MobileMenu,
  FAQ,
  News,
  ConfirmRegistration,
  FourOFour,
  Charts,
  Profile,
  AdView,
  AdList,
  AdEdit,
  NewPost
} from "views";
import { Layout } from "../layout";
import { LayoutConfig } from "configurations";
import { LoadingScreen } from "components";

export const AppRoutes = props => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage =
    LayoutConfig.landingPage !== undefined
      ? LayoutConfig.landingPage !== ""
        ? LayoutConfig.landingPage
        : "/"
      : "/";
  if (loginStatus === undefined) return <LoadingScreen />;
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          loginStatus ? (
            <Redirect to={{ pathname: landingPage }} {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: landingPage
                }}
                {...props}
              />
            )
        }
      />

      <Route
        exact
        path="/login"
        render={() =>
          !loginStatus ? (
            <Login {...props} />
          ) : (
              <Redirect to={{ pathname: landingPage }} {...props} />
            )
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          !loginStatus ? (
            <Register {...props} />
          ) : (
              <Redirect to={{ pathname: landingPage }} {...props} />
            )
        }
      />
      <Route
        exact
        path="/confirm-registration"
        render={() =>
          !loginStatus ? (
            <ConfirmRegistration {...props} />
          ) : (
              <Redirect to={{ pathname: landingPage }} {...props} />
            )
        }
      />

      <Route
        exact
        path="/home"
        render={() => (
          <Layout>
            <Home {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/FAQ"
        render={() => (
          <Layout>
            <FAQ {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/profile"
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) : (
              <Layout>
                {" "}
                <Profile {...props} />
              </Layout>
            )
        }
      />
      <Route
        exact
        path="/menu"
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) : (
              <Layout>
                {" "}
                <MobileMenu {...props} />
              </Layout>
            )
        }
      />
      <Route
        exact
        path="/stats"
        render={() => (
          <Layout>
            {" "}
            <Charts {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/adv"
        render={() => (
          <Layout>
            {" "}
            <AdView {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/news"
        render={() =>
          (
            <Layout>
              {" "}
              <News {...props} />
            </Layout>
          )
        }
      />

      <Route
        exact
        path="/locals"
        render={() =>
          <Layout>
            <AdList {...props} />
          </Layout>
        }
      />

      <Route
        exact
        path="/newPost"
        render={() =>
          <Layout>
            <NewPost {...props} />
          </Layout>
        }
      />
      <Route
        exact
        path="/adedit"
        render={() =>
          <Layout>
            <AdEdit {...props} />
          </Layout>
        }
      />

      <Route
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/" }} {...props} />
          ) : (
              <Layout>
                <FourOFour {...props} />
              </Layout>
            )
        }
      />
    </Switch>
  );
};

/**
 * Changelog 26/09/2019 - Sanchit Dang
 * - use loginStatus variable instead of stateVariable
 * - <Layout/> has to be used alongside every inner view
 * - removed use of trigger404 function
 */
