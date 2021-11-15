import React, { useState, useEffect } from "react";
import { useContext } from "./context/ContextProvider";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ui from "./lang/ui.json";
import Loading from "./components/loading/Loading";
import Login from "./views/login/Login";
import Main from "./views/main/Main";
import NotMatch from "./views/notmatch/NotMatch";

const App = () => {
  const [loading, setLoading] = useState(true);
  //const [contextState, setContextState] = useContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Login texts={ui.ES.Login} />
            </Route>
            <Route exact path="/signup">
              <Signup texts={ui.ES.SingUp} />
            </Route>
            <Route exact path="/forgot">
              <Forgot texts={ui.ES.Forgot} />
            </Route>
            <Route>
              <NotMatch texts={ui.ES.NotMatch} />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
