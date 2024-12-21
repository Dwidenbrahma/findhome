import React, { useState, createContext } from "react";

export const ShowDashContext = createContext();

export const DashProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
    <ShowDashContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </ShowDashContext.Provider>
  );
};
