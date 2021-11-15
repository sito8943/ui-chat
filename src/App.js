import React, { useState, useEffect } from "react";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ui from "./lang/ui.json";
import Loading from "./components/loading/Loading";

const App = () => {
  const [loading, setLoaging] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <ContextProvider>
            <Switch>
              <Route exact path="/"></Route>
              <Route>
                <NotMatch texts={ui} />
              </Route>
            </Switch>
          </ContextProvider>
        </Router>
      )}
    </>
  );
};

export default App;
