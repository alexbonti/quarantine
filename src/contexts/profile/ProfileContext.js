
import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = props => {
  const { children } = props;
  const [profileId, setProfileId] = useState();
  const [profileUserName, setProfileUserName] = useState();
  const [profileLastName, setProfileLastName] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        profileId, setProfileId,
        profileUserName, setProfileUserName,
        profileLastName, setProfileLastName,
        isUpdated,
        setIsUpdated
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
