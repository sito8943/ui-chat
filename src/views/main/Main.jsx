import React, { useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

import SideBar from "../../components/theme/sideBar/SideBar";

const Main = (props) => {
  const { contextState, setContextState } = useContext();

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="main">
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        style={{ padding: "0" }}
        data-uk-grid
      >
        <SideBar side="left"></SideBar>
        <div className="uk-width-expand"></div>
      </div>
    </div>
  );
};

export default Main;
