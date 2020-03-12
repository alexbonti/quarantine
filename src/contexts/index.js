import React from "react";
import { LoginContext, LoginProvider } from "./common/LoginContext";
import { LayoutContext, LayoutProvider } from "./common/LayoutContext";
import { UserContext, UserProvider } from "./profile/ProfileContext";

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  UserContext,
  UserProvider
};

export const ContextManager = props => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
