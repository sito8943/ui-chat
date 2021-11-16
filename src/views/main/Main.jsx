import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

const Main = (props) => {
  const { contextState, setContextState } = useContext();

  return (
    <div classNameName="main">
      <div
        className="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-margin-large-top"
        data-uk-grid
      >
        <div>
          <div className="uk-background-muted uk-padding">Item</div>
        </div>
        <div>
          <div className="uk-background-primary uk-padding uk-light">Item</div>
        </div>
        <div>
          <div className="uk-background-secondary uk-padding uk-light">Item</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
