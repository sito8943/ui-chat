import React, { useState, useEffect } from "react";
import { base64encode } from "nodejs-base64";
import { useContext } from "./context/ContextProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import User from "./models/User";

import { colors } from "./utils/colors";
import { GetTexts } from "./lang/texts";

import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";

import Login from "./views/login/Login";
import SignUp from "./views/signup/SignUp";
import Main from "./views/main/Main";
import NotMatch from "./views/notmatch/NotMatch";
import Forgot from "./views/forgot/Forgot";
import Account from "./views/account/Account";

import "uikit/dist/css/uikit.min.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { contextState, setContextState } = useContext();

  const init = () => {
    if (contextState.user.Name === undefined) {
      if (localStorage.getItem("username") !== null)
        setContextState({
          type: "log-in",
          user: new User(
            base64encode(localStorage.getItem("username")),
            localStorage.getItem("username")
          ),
        });
      else if (sessionStorage.getItem("username"))
        setContextState({
          type: "log-in",
          user: new User(
            base64encode(sessionStorage.getItem("username")),
            sessionStorage.getItem("username")
          ),
        });
    }
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div
      id="main-back"
      className="main-background"
      style={{
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightMainBackground
            : colors.DarkMainBackground,
      }}
    >
      {loading ? (
        <Loading type="big" />
      ) : (
        <Router>
          <Notification texts={GetTexts(contextState.lang, "Notification")} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Navbar texts={GetTexts(contextState.lang, "Navbar")} />}
            >
              <Route
                index
                element={<Main texts={GetTexts(contextState.lang, "Main")} />}
              />
              {contextState.user.Name === undefined ? (
                <>
                  <Route
                    path="/login"
                    element={
                      <Login texts={GetTexts(contextState.lang, "Login")} />
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <SignUp texts={GetTexts(contextState.lang, "SignUp")} />
                    }
                  />
                  <Route
                    path="forgot"
                    element={
                      <Forgot texts={GetTexts(contextState.lang, "Forgot")} />
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path="account"
                    element={
                      <Account texts={GetTexts(contextState.lang, "Account")} />
                    }
                  />
                </>
              )}
              <Route
                path="*"
                element={
                  <NotMatch texts={GetTexts(contextState.lang, "NotMatch")} />
                }
              />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
