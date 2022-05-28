import React, { useState, useEffect, useCallback } from "react";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
const calculateRemainingtime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const sotredExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingtime(sotredExpirationDate);
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  } else {
    return {
      token: storedToken,
      duration: remainingTime,
    };
  }
};
const tokenData = retrieveStoredToken();
export const AuthContextProvider = (props) => {
  let initialToke;
  if (tokenData) {
    initialToke = tokenData.token;
  }
  const [token, setToken] = useState(initialToke);
  const userIsLoggedIn = !!token;
  const logoutHandler = useCallback(
    () => () => {
      setToken(null);

      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    },
    []
  );

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingtime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  const authContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
