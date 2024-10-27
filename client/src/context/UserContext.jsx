/* eslint-disable react/prop-types */
// this file is used to help accessing user that is loggedin in any component that will be wrap in UserContext.jsx in the app page

import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { loading, data } = useQuery(GET_ME);

  return (
    <UserContext.Provider value={{ loading, user: data?.me }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
