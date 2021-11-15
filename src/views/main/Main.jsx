import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

const Main = (props) => {
  const [contextState, setContextState] = useContext();

  return <div className="main"></div>;
};

export default Main;
