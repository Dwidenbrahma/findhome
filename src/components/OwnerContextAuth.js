import React, { createContext, useState, useEffect } from "react";

export const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {
  const [ownerToken, setOwnerToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOwnerToken = localStorage.getItem("ownerToken");
    setOwnerToken(storedOwnerToken);
    setLoading(false);
  }, []);

  return (
    <OwnerAuthContext.Provider value={{ ownerToken, setOwnerToken, loading }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};
